package models

type GameCategory struct {
	GameID     uint `gorm:"column:game_id;not null"`
	CategoryID uint `gorm:"column:category_id;not null"`

	Game     Game     `gorm:"foreignKey:GameID"`
	Category Category `gorm:"foreignKey:CategoryID"`
}
