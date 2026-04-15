package models

import (
	"gorm.io/gorm"
)

type Game struct {
	gorm.Model
	Nom  string `json:"nom"`
	Slug string `gorm:"uniqueIndex" json:"slug"`
}
