package models

type Game struct {
	// gorm.Model
	// ID string `json:"id" `
	Nom  string `json:"nom"`
	Slug string `gorm:"uniqueIndex" json:"slug"`
}
