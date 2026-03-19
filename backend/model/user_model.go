package model

type User struct {
	Id        int    `gorm:"column:id" json:"id"`
	Name      string `gorm:"column:name" json:"name"`
	BirthDate string `gorm:"column:birthdate" json:"birthdate"`
	Address   string `gorm:"column:address" json:"address"`
	Age       int    `gorm:"column:age" json:"age"`
}

func (u User) TableName() string {
	return "users"
}
