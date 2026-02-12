package models

import (
	"gorm.io/gorm"
)

type Game struct {
	gorm.Model
	Slug           string         `gorm:"uniqueIndex" json:"slug"`
	Nom            string         `json:"nom"`
	Descripcion    string         `json:"descripcion"`
	Precio         int            `json:"precio"`
	Developer      string         `json:"developer"`
	IsActive       bool           `gorm:"default:true;column:isActive" json:"isActive"`
	GameCategories []GameCategory `gorm:"foreignKey:GameID"`
	GameImages     []GameImage    `gorm:"foreignKey:GameID"`
	Categories     []Category     `gorm:"many2many:game_categories;"`
}

func (g *Game) ToMap() map[string]interface{} {

	categories := make([]string, len(g.Categories))
	for i, cat := range g.Categories {
		categories[i] = cat.Nom
	}
	
	images := make([]string, len(g.GameImages))
	for i, img := range g.GameImages {
		images[i] = img.Image
	}

	return map[string]interface{}{
		"slug":        g.Slug,
		"nom":         g.Nom,
		"descripcion": g.Descripcion,
		"precio":      g.Precio,
		"developer":   g.Developer,
		// "isActive":    g.IsActive,
		"categories": categories,
		"images":     images,
	}
}
