package main

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"mime/multipart"
	"net/http"
	"strings"
)

func SortCSV() {
    fmt.Println("Sort called")
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

	for scanner.Scan() {
		currLine := scanner.Text()
		fmt.Println("Read Line: ", currLine)
	}

	if err := scanner.Err(); err != nil {
		http.Error(*w, "Error Reading File On the server", http.StatusBadRequest)
        return
    }

	(*w).Header().Set("Content Type", "application/json")
    fmt.Fprintf(*w, `{"message": "Hello from the server calling the delete duplicates function"}`)


	//Pretty sure this is redundant but just in case, shouldn't hurt anything
	file.Close()
}
