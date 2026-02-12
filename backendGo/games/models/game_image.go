package models

type GameImage struct {
	GameID uint   `gorm:"column:game_id;not null"`
	Image  string `gorm:"column:image" json:"image"`
	Game   Game   `gorm:"foreignKey:GameID"`
}
