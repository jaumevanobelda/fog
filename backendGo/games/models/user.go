package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `json:"username" gorm:"uniqueIndex"`
	Email    string `json:"email" gorm:"uniqueIndex"`
	Password string `json:"password"`
	Role     string `json:"role"`
	Foto     string `json:"foto"`
}

// func (u *User) ToMap() map[string]interface{} {
// 	return map[string]interface{}{
// 		"username": u.Username,
// 		"email":    u.Email,
// 		"role":     u.Role,
// 		"foto":     u.Foto,
// 	}
// }
