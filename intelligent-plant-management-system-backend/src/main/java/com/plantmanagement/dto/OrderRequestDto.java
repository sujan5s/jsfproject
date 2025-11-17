package com.plantmanagement.dto;

import java.math.BigDecimal;
import java.util.List;

public class OrderRequestDto {

    private Long userId;
    private BigDecimal totalPrice;
    private List<OrderItemDto> items;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }

    public List<OrderItemDto> getItems() { return items; }
    public void setItems(List<OrderItemDto> items) { this.items = items; }
}