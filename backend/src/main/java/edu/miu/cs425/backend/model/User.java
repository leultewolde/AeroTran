package edu.miu.cs425.backend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "at-users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer age;
    private String phone;
    private Integer creditCardId;
//    @Column(unique = true, nullable = false)
//    private String email;
//    @Enumerated(EnumType.STRING)
//    private Role role;

    public User(long id, String name , int age, String phone , int creditCardId) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.creditCardId = creditCardId;
    }
}
