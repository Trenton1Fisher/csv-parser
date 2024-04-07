package main

import (
	"bufio"
	"crypto/sha256"
	"encoding/csv"
	"fmt"
	"mime/multipart"
	"net/http"
	"strconv"
	"strings"
)

//Using a not so great approach for now, where I load it all into main memory and run quicksort on it Then write to the body
//I plan on coming back to this and implementing a version of general multipass merge sort for use cases where the file might be
// too large for a giant slice in main memory
func SortCSV(file multipart.File, w *http.ResponseWriter, valueIndex int, valueType int) {

    buffer := make([][]string, 0)

    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
        currLine := scanner.Text()
        fields := strings.Split(currLine, ",")
        buffer = append(buffer, fields) 
    }
    buffer = quick_sort(buffer, valueIndex, valueType, 0, (len(buffer) - 1))

    (*w).Header().Set("Content-Type", "text/csv")
    (*w).Header().Set("Content-Disposition", "attachment; filename=return.csv")

    writer := csv.NewWriter(*w)
    defer writer.Flush()

    for _, row := range buffer {
        err := writer.Write(row)
        if err != nil {
            fmt.Println(err)
            return
        }
    }
}

//Using a version of quick sort but also taking into account if user wants to sort string values
func quick_sort(buffer [][]string, valueIndex int, valueType int, low int, high int) [][]string {
    if low < high {
        var p int
        buffer, p = partition(buffer, valueIndex, valueType, low, high)
        buffer = quick_sort(buffer, valueIndex, valueType, low, p-1)
        buffer = quick_sort(buffer, valueIndex, valueType, p+1, high)
    }
    return buffer
}

func partition(buffer [][]string, valueIndex int, valueType int, low int, high int) ([][]string, int) {
    pivot := buffer[high][valueIndex - 1]
    i := low

    for j := low; j < high; j++ {
        var comparison bool
        if valueType == 2 {
            comparison = buffer[j][valueIndex - 1] < pivot
        }else {
            //I should probably error handle
            a, _ := strconv.Atoi(buffer[j][valueIndex - 1])
            b, _ := strconv.Atoi(pivot)
            comparison = a < b
        }

        if comparison {
            buffer[i], buffer[j] = buffer[j], buffer[i]
            i++
        }
    }
    
    buffer[i], buffer[high] = buffer[high], buffer[i]
    return buffer, i
}


func SearchCSV(file multipart.File, w *http.ResponseWriter, valueIndex int, searchValue string) {
    defer file.Close()

    foundData := make([]string, 0)
    scanner := bufio.NewScanner(file)

    for scanner.Scan() {
        currLine := scanner.Text()
        fields := strings.Split(currLine, ",")
        if valueIndex-1 < len(fields) && fields[valueIndex-1] == searchValue {
            foundData = append(foundData, currLine)
        }
    }

    if err := scanner.Err(); err != nil {
        http.Error(*w, "Error Scanning the file", http.StatusBadRequest)
        return
    }

    (*w).Header().Set("Content-Type", "text/csv")
    (*w).Header().Set("Content-Disposition", "attachment; filename=return.csv")

    writer := csv.NewWriter(*w)
    defer writer.Flush()

    for _, row := range foundData {
        err := writer.Write(strings.Split(row, ","))
        if err != nil {
            fmt.Println(err)
            return
        }
    }
}

func DeleteDuplicatesFromCSV(file multipart.File, w *http.ResponseWriter) {
	defer file.Close()

	scanner := bufio.NewScanner(file)
    recordKey := make(map[string]bool)
    uniqeRecords := make([]string, 0)

    hash := sha256.New()

	for scanner.Scan() {
		currLine := scanner.Text()
        currLineConcat := strings.ReplaceAll(currLine, ",", "")
        currLineNoWhiteSpace := strings.TrimSpace(currLineConcat)

        hash.Write([]byte(currLineNoWhiteSpace))
        uniqueKey := fmt.Sprintf("%x", hash.Sum(nil))

        if _, exists := recordKey[uniqueKey]; !exists {
            recordKey[uniqueKey] = true
            uniqeRecords = append(uniqeRecords, currLine)
        }

        hash.Reset()
	}

	if err := scanner.Err(); err != nil {
		http.Error(*w, "Error Reading File On the server", http.StatusBadRequest)
        return
    }

    (*w).Header().Set("Content-Type", "text/csv")
    (*w).Header().Set("Content-Disposition", "attachment; filename=return.csv")

    writer := csv.NewWriter(*w)
    defer writer.Flush()

    for _, row := range uniqeRecords {
        err := writer.Write(strings.Split(row, ","))
        if err != nil {
            fmt.Println(err)
            return
        }
    }

}
