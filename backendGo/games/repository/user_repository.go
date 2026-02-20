package repository

import (
	"games/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	FindDeveloper(id string) (*models.User, error)
}

type userRepo struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepo{db}
}

func (r *userRepo) FindDeveloper(id string) (*models.User, error) {
	var user models.User
	if err := r.db.Unscoped().Where("ID = ?", id).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
