package service

import (
	"backend/model"
	"backend/repository"
)

type UserService struct {
	repo repository.UserRepoMethod
}

type UserSerivceInterface interface {
	GetAll() ([]model.User, error)
	Create(user model.User) error
}

func NewUserService(repo repository.UserRepoMethod) UserSerivceInterface {
	return &UserService{repo: repo}
}

func (u *UserService) GetAll() ([]model.User, error) {
	users, err := u.repo.GetAll()
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (u *UserService) Create(user model.User) error {
	result := u.repo.Create(user)

	return result
}
