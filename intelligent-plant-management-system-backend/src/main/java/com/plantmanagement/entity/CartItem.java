package com.plantmanagement.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // link to product (plant)
    private Long plantId;

    private String plantName;

    private BigDecimal price;

    private Integer quantity;

    // link to user who owns the cart item
    private Long userId;

    public CartItem() {}

    public CartItem(Long plantId, String plantName, BigDecimal price, Integer quantity, Long userId) {
        this.plantId = plantId;
        this.plantName = plantName;
        this.price = price;
        this.quantity = quantity;
        this.userId = userId;
    }

    // getters / setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPlantId() { return plantId; }
    public void setPlantId(Long plantId) { this.plantId = plantId; }

    public String getPlantName() { return plantName; }
    public void setPlantName(String plantName) { this.plantName = plantName; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
