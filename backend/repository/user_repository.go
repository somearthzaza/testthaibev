package repository

import (
	"backend/model"

	"gorm.io/gorm"
)

type UserRepo struct {
	db *gorm.DB
}

type UserRepoMethod interface {
	GetAll() ([]model.User, error)
	Create(model.User) error
}

func NewUserRepo(db *gorm.DB) *UserRepo {
	return &UserRepo{
		db: db,
	}
}

func (u *UserRepo) GetAll() ([]model.User, error) {
	var users []model.User
	result := u.db.Find(&users)
	return users, result.Error
}

func (u *UserRepo) Create(users model.User) error {
	result := u.db.Create(&users).Error
	return result
}
