package repository

import (
	"library/models"

	"gorm.io/gorm"
)

type LibraryRepository interface {
	FindGamesByUserId(userId string) ([]models.Game, error)
}

type libraryRepository struct {
	db *gorm.DB
}

func NewLibraryRepository(db *gorm.DB) LibraryRepository {
	return &libraryRepository{db}
}

func (r *libraryRepository) FindGamesByUserId(userId string) ([]models.Game, error) {
	var games []models.Game
	err := r.db.Select("nom", "slug").
		Joins("JOIN libraries ON games.id = libraries.game_id").
		Where("libraries.user_id = ?", userId).
		Find(&games).Error

	if err != nil {
		return nil, err
	}
	return games, nil
}
