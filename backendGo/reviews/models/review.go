package models

import (
	"gorm.io/gorm"
)

type Review struct {
	gorm.Model
	UserID   uint   `gorm:"uniqueIndex:idx_user_game" json:"user_id"`
	GameID   uint   `gorm:"uniqueIndex:idx_user_game" json:"game_id"`
	Positive bool   `json:"positive"`
	Text     string `json:"text"`
	Game     Game   `gorm:"foreignKey:GameID"`
	User     User   `gorm:"foreignKey:UserID"`
}
