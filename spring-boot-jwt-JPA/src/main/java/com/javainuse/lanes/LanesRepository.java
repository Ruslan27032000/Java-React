package com.javainuse.lanes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface LanesRepository extends JpaRepository<LanesModel, Long> {
}
