package handler

import (
	"fmt"
	"library/repository"
	"net/http"

	"github.com/davecgh/go-spew/spew"
	"github.com/gin-gonic/gin"
)

type LibraryHandler struct {
	collectionRepo repository.CollectionRepository
	libraryRepo    repository.LibraryRepository
}

func NewLibraryHandler(cr repository.CollectionRepository, lr repository.LibraryRepository) *LibraryHandler {
	return &LibraryHandler{
		collectionRepo: cr,
		libraryRepo:    lr,
	}
}

func (h *LibraryHandler) GetLibrary(c *gin.Context) {

	games, err := h.libraryRepo.FindGamesByUserId(c.GetHeader("User-Id"))
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusNotFound, gin.H{"error": err})
		return
	}
	library := gin.H{"slug": "all", "collection": "Todos los juegos", "games": games}
	collections, err2 := h.collectionRepo.GetCollections(c.GetHeader("User-Id"))
	if err2 != nil {
		fmt.Println(err)
		c.JSON(http.StatusNotFound, gin.H{"error": err})
		return
	}

	combined := append([]map[string]interface{}{library}, collections...)

	c.JSON(http.StatusOK, gin.H{"library": combined})

}

func (h *LibraryHandler) AddCollection(c *gin.Context) {
	type reqBody struct {
		Nom string `json:"nom"`
	}
	fmt.Println(c.GetHeader("User-Id"))

	// spew.Dump("body")

	var body reqBody

	c.ShouldBindJSON(&body)

	// spew.Dump(&body)

	fmt.Println(body.Nom)
	collection, err := h.collectionRepo.CreateCollection(c.GetHeader("User-Id"), body.Nom)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusNotFound, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{"collection": collection})

}

func (h *LibraryHandler) AddCollectionGame(c *gin.Context) {
	type reqBody struct {
		Slug string `json:"slug"`
	}

	var body reqBody

	c.ShouldBindJSON(&body)

	spew.Dump(&body)

	fmt.Println(body.Slug)
	err := h.collectionRepo.CreateCollectionGame(c.GetHeader("User-Id"), c.Param("collectionSlug"), body.Slug)
	if err != nil {
		spew.Dump(&err)
		c.JSON(http.StatusOK, gin.H{"error": err})
	}

	c.JSON(http.StatusOK, gin.H{})

}

func (h *LibraryHandler) DeleteCollectionGame(c *gin.Context) {

	err := h.collectionRepo.DeleteCollectionGame(c.GetHeader("User-Id"), c.Param("collectionSlug"), c.Param("gameSlug"))
	if err != nil {
		spew.Dump(&err)
		c.JSON(http.StatusOK, gin.H{"error": err})
	}

	c.JSON(http.StatusOK, gin.H{})

}

func (h *LibraryHandler) DeleteCollection(c *gin.Context) {

	err := h.collectionRepo.DeleteCollection(c.GetHeader("User-Id"), c.Param("collectionSlug"))
	if err != nil {
		spew.Dump(&err)
		c.JSON(http.StatusOK, gin.H{"error": err})
	}

	c.JSON(http.StatusOK, gin.H{})

}
