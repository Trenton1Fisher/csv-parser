package main

import (
	"log"
	"net/http"
	"strconv"
)

func enableCors(w *http.ResponseWriter) {
  (*w).Header().Set("Access-Control-Allow-Origin", "https://parser.trentonfisher.xyz")
}

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    enableCors(&w)

    err := r.ParseMultipartForm(10 << 20)
    if err != nil {
      http.Error(w, "Failed to parse data", http.StatusBadRequest)
      return
    }
  
    file, _ , err := r.FormFile("file")
    if err != nil {
      http.Error(w, "Failed to Open File", http.StatusBadRequest)
      return
    }
  
    defer file.Close()
  
    actionStr := r.PostFormValue("action")
    valueTypeStr := r.PostFormValue("valueType")
    valueIndexStr := r.PostFormValue("index")
    searchValue := r.PostFormValue("searchValue")
  
    action, err := strconv.Atoi(actionStr)
    if err != nil || action < 1 || action > 3 {
        http.Error(w, "Invalid value for action", http.StatusBadRequest)
        return
    }
  
    valueType, err := strconv.Atoi(valueTypeStr)
    if err != nil || valueType < 1 || valueType > 2 {
        http.Error(w, "Invalid value for valueType", http.StatusBadRequest)
        return
    }
  
    valueIndex, err := strconv.Atoi(valueIndexStr)
    if err != nil || valueIndex < 1 {
        http.Error(w, "Invalid value for valueIndex", http.StatusBadRequest)
          return 
    }
  
    switch action {
    case 1: 
      SortCSV(file, &w, valueIndex, valueType)
    case 2: 
      SearchCSV(file, &w, valueIndex, searchValue)
    case 3: 
      DeleteDuplicatesFromCSV(file, &w)

    }

  })

	log.Fatal(http.ListenAndServe(":8080", nil))
}


