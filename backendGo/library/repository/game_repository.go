package repository

import (
	// "library/models"
	"gorm.io/gorm"
)

type GameRepository interface {
}

type gameRepository struct {
	db *gorm.DB
}

func NewGameRepository(db *gorm.DB) GameRepository {
	return &gameRepository{db}
}
