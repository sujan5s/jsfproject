package com.plantmanagement.controller;

import com.plantmanagement.entity.CartItem;
import com.plantmanagement.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // GET /api/cart/{userId}  -> return list of CartItem
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartForUser(userId));
    }

    // POST /api/cart/{userId}/add  -> body contains plantId, plantName, price, quantity
    @PostMapping("/{userId}/add")
    public ResponseEntity<CartItem> addToCart(
            @PathVariable Long userId,
            @RequestBody CartItemDto dto
    ) {
        CartItem item = new CartItem(dto.getPlantId(), dto.getPlantName(), dto.getPrice(), dto.getQuantity(), userId);
        CartItem saved = cartService.addItem(item);
        return ResponseEntity.ok(saved);
    }

    // PUT /api/cart/update/{itemId}
    @PutMapping("/update/{itemId}")
    public ResponseEntity<CartItem> updateItem(@PathVariable Long itemId, @RequestBody UpdateQtyDto dto) {
        CartItem updated = cartService.updateItem(itemId, dto.getQuantity());
        return ResponseEntity.ok(updated);
    }

    // DELETE /api/cart/remove/{itemId}
    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<String> removeItem(@PathVariable Long itemId) {
        cartService.removeItem(itemId);
        return ResponseEntity.ok("removed");
    }

    // DTO inner classes used for request bodies
    public static class CartItemDto {
        private Long plantId;
        private String plantName;
        private java.math.BigDecimal price;
        private Integer quantity;

        // getters / setters
        public Long getPlantId() { return plantId; }
        public void setPlantId(Long plantId) { this.plantId = plantId; }
        public String getPlantName() { return plantName; }
        public void setPlantName(String plantName) { this.plantName = plantName; }
        public java.math.BigDecimal getPrice() { return price; }
        public void setPrice(java.math.BigDecimal price) { this.price = price; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    public static class UpdateQtyDto {
        private Integer quantity;
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }
}
