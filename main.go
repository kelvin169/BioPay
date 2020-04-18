package main 

import (
	"fmt"
	"log"
	"net/http"
)
func homePage (w http.ResponseWriter, r *http.Response){
	fmt.Fprintf (w "We are making Progress")
}

func handleRequests() { 
	http HandleFunc ("/" homepage)
	log.Fatal(http.ListenAndServe(":8081", nil))
}

func main (){
	handleRequests()
}