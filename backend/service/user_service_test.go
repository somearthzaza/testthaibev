package service

import (
	"backend/model"
	"errors"
	"testing"
)

type mockUserRepo struct {
	Users []model.User
	err   error
}

func (m *mockUserRepo) GetAll() ([]model.User, error) {
	return m.Users, m.err
}

func (m *mockUserRepo) Create(model.User) error {
	return m.err
}

func TestGetAll_Success(t *testing.T) {
	mockRepo := &mockUserRepo{
		Users: []model.User{
			{Id: 1, Name: "John doe", Age: 40},
			{Id: 2, Name: "jane doe", Age: 30},
			{Id: 3, Name: "joe dane", Age: 30},
		},
	}

	service := NewUserService(mockRepo)

	users, err := service.GetAll()
	if err != nil {
		t.Errorf("expected no error, got %v", err)
	}

	if len(users) != 3 {
		t.Errorf("expected 3 users, got %d", len(users))
	}
}

func TestGetAll_Error(t *testing.T) {
	mockRepo := &mockUserRepo{
		err: errors.New("database error"),
	}

	service := NewUserService(mockRepo)
	_, err := service.GetAll()

	if err == nil {
		t.Error("expected error, got nil")
	}
}

func TestCreate_Success(t *testing.T) {
	mockRepo := &mockUserRepo{
		Users: []model.User{},
		err:   nil, // ← ไม่มี error = success
	}

	service := NewUserService(mockRepo)

	newUser := model.User{
		Name: "joe dane",
		Age:  30,
	}

	err := service.Create(newUser)
	if err != nil {
		t.Errorf("expected no error, got %v", err)
	}
}

func TestCreate_Error(t *testing.T) {
	mockRepo := &mockUserRepo{
		Users: []model.User{},
		err:   errors.New("database error"),
	}

	service := NewUserService(mockRepo)

	newUser := model.User{
		Name: "joe dane",
		Age:  30,
	}

	err := service.Create(newUser)
	if err == nil {
		t.Error("expected error but got nil")
	}
	if err.Error() != "database error" {
		t.Errorf("expected 'database error', got '%v'", err.Error())
	}
}
