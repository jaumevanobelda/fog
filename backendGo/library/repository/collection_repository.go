package repository

import (
	"library/models"
	"strconv"

	"github.com/davecgh/go-spew/spew"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CollectionRepository interface {
	GetCollections(userID string) ([]map[string]interface{}, error)
	CreateCollection(userID string, nom string) (interface{}, error)
	DeleteCollection(userID string, slug string) error
	CreateCollectionGame(userID string, collectionSlug string, gameSlug string) error
	DeleteCollectionGame(userID string, collectionSlug string, gameSlug string) error
}

type collectionRepository struct {
	db *gorm.DB
}

func NewCollectionRepository(db *gorm.DB) CollectionRepository {
	return &collectionRepository{db}
}

func (r *collectionRepository) GetCollections(userID string) ([]map[string]interface{}, error) {
	var collections []models.UserCollection
	if err := r.db.Where("user_id = ?", userID).Find(&collections).Error; err != nil {
		return nil, err
	}

	var result []map[string]interface{}
	for _, coll := range collections {
		var games []models.Game
		r.db.Select("games.nom, games.slug").
			Joins("JOIN collection_games on collection_games.game_id = games.id").
			Where("collection_games.collection_id = ?", coll.ID).
			Find(&games)
		var gamesList []map[string]string
		for _, g := range games {
			gamesList = append(gamesList, map[string]string{
				"nom":  g.Nom,
				"slug": g.Slug,
			})
		}
		if gamesList == nil {
			gamesList = make([]map[string]string, 0)
		}

		result = append(result, map[string]interface{}{
			"slug":       coll.Slug,
			"collection": coll.Nom,
			"games":      gamesList,
		})
	}
	return result, nil
}

func (r *collectionRepository) CreateCollection(userID string, nom string) (interface{}, error) {
	UserID_int, errUserId := strconv.ParseUint(userID, 0, 0)
	if errUserId != nil {
		return nil, errUserId
	}
	collection := &models.UserCollection{
		UserID: UserID_int,
		Nom:    nom,
	}

	if err := r.db.Create(collection).Error; err != nil {
		return nil, err
	}
	var result interface{}
	result = gin.H{
		"slug":       collection.Slug,
		"collection": collection.Nom,
		"games":      [0]string{},
	}
	spew.Dump(result)

	return result, nil
}

func (r *collectionRepository) DeleteCollection(userID string, slug string) error {
	var collection models.UserCollection
	if err := r.db.Where("user_id = ? AND slug = ?", userID, slug).First(&collection).Error; err != nil {
		return err
	}

	if err := r.db.Where("collection_id = ?", collection.ID).Delete(&models.CollectionGame{}).Error; err != nil {
		return err
	}

	return r.db.Delete(&collection).Error
}

func (r *collectionRepository) CreateCollectionGame(userID string, collectionSlug string, gameSlug string) error {
	var collection models.UserCollection
	if err := r.db.Where("user_id = ? AND slug = ?", userID, collectionSlug).First(&collection).Error; err != nil {
		return err
	}

	var game struct{ ID uint }
	if err := r.db.Table("games").Select("id").Where("slug = ?", gameSlug).First(&game).Error; err != nil {
		return err
	}

	cg := models.CollectionGame{
		CollectionID: collection.ID,
		GameID:       game.ID,
	}

	return r.db.FirstOrCreate(&cg, cg).Error
}

func (r *collectionRepository) DeleteCollectionGame(userID string, collectionSlug string, gameSlug string) error {
	var collection models.UserCollection
	if err := r.db.Where("user_id = ? AND slug = ?", userID, collectionSlug).First(&collection).Error; err != nil {
		return err
	}

	var game struct{ ID uint }
	if err := r.db.Table("games").Select("id").Where("slug = ?", gameSlug).First(&game).Error; err != nil {
		return err
	}

	return r.db.Where("collection_id = ? AND game_id = ?", collection.ID, game.ID).Delete(&models.CollectionGame{}).Error
}
