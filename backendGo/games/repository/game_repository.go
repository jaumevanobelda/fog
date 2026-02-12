package repository

import (
	"fmt"
	"games/models"

	"gorm.io/gorm"
)

type GameRepository interface {
	FindOne(slug string) (*models.Game, error)
	GetMaxPrecio() (int, error)
}

type gameRepo struct {
	db *gorm.DB
}

func NewGameRepository(db *gorm.DB) GameRepository {
	return &gameRepo{db}
}

func (r *gameRepo) FindOne(slug string) (*models.Game, error) {
	var game models.Game
	if err := r.db.
		Preload("Categories").
		Preload("GameImages").
		Where("slug = ?", slug).
		First(&game).Error; err != nil {
		return nil, err
	}
	return &game, nil
}

func (r *gameRepo) GetMaxPrecio() (int, error) {
	var maxPrecio int
	err := r.db.Model(&models.Game{}).Select("MAX(precio)").Where("\"isActive\" = ?", true).Scan(&maxPrecio).Error
	fmt.Println(maxPrecio)
	if err != nil {
		return 0, err
	}
	return maxPrecio, nil
}
