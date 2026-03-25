package models

import (
	"strings"

	"gorm.io/gorm"
)

type UserCollection struct {
	ID     uint   `gorm:"primaryKey" json:"-"`
	UserID uint64 `gorm:"not null" json:"user_id"`
	Nom    string `gorm:"not null" json:"nom"`
	Slug   string `gorm:"not null" json:"slug"`
}

func (c *UserCollection) BeforeCreate(tx *gorm.DB) (err error) {
	s := strings.ToLower(c.Nom)
	c.Slug = strings.ReplaceAll(s, " ", "-")
	return
}

type CollectionGame struct {
	CollectionID uint `gorm:"primaryKey;autoIncrement:false" json:"collection_id"`
	GameID       uint `gorm:"primaryKey;autoIncrement:false" json:"game_id"`
}
