package main

import (
	"fmt"
	"log"
	"net/http"
)

func uploadHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World!")
}

func main() {
	http.HandleFunc("/", uploadHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}


