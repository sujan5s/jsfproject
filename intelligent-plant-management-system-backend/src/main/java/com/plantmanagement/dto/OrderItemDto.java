package com.plantmanagement.dto;

import java.math.BigDecimal;

public class OrderItemDto {
    private Long plantId;
    private Integer quantity;
    private BigDecimal price;

    public Long getPlantId() { return plantId; }
    public void setPlantId(Long plantId) { this.plantId = plantId; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
}