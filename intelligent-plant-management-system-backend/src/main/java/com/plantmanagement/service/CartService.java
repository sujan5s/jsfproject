package com.plantmanagement.service;

import com.plantmanagement.entity.CartItem;
import com.plantmanagement.repository.CartItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartItemRepository repo;

    public CartService(CartItemRepository repo) {
        this.repo = repo;
    }

    public List<CartItem> getCartForUser(Long userId) {
        return repo.findByUserId(userId);
    }

    public CartItem addItem(CartItem item) {
        // if same plant exists for user, increase quantity
        List<CartItem> items = repo.findByUserId(item.getUserId());
        Optional<CartItem> existing = items.stream()
                .filter(i -> i.getPlantId().equals(item.getPlantId()))
                .findFirst();

        if (existing.isPresent()) {
            CartItem e = existing.get();
            e.setQuantity(e.getQuantity() + item.getQuantity());
            return repo.save(e);
        } else {
            return repo.save(item);
        }
    }

    public CartItem updateItem(Long itemId, Integer quantity) {
        CartItem ci = repo.findById(itemId).orElseThrow(() -> new RuntimeException("Cart item not found"));
        ci.setQuantity(quantity);
        return repo.save(ci);
    }

    public void removeItem(Long itemId) {
        repo.deleteById(itemId);
    }

    public void clearCart(Long userId) {
        repo.findByUserId(userId).forEach(ci -> repo.deleteById(ci.getId()));
    }
}
