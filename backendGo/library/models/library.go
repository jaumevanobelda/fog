package models

import (
	"gorm.io/gorm"
)

type Library struct {
	gorm.Model
	UserID uint `json:"user_id"`
	GameID uint `json:"game_id"`
	// Game    Game   `gorm:"foreignKey:GameID"`
}
