package models

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	Nom      string `gorm:"column:nom" json:"nom"`
	Slug     string `gorm:"uniqueIndex;column:slug" json:"slug"`
	IsActive bool   `gorm:"column:isActive;default:true" json:"isActive"`
}

func (c *Category) ToMap() map[string]interface{} {

	return map[string]interface{}{
		"slug": c.Slug,
		"nom":  c.Nom,
	}
}

func CategoriesToMap(categories []Category) []map[string]interface{} {
	result := make([]map[string]interface{}, len(categories))
	for i := range categories {
		result[i] = categories[i].ToMap()
	}
	return result
}
