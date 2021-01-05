package com.devsuperior.dsdeliver.repository;

import com.devsuperior.dsdeliver.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
