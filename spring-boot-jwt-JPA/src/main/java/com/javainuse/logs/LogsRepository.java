package com.javainuse.logs;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogsRepository extends JpaRepository<LogsModel,Long> {
    List<LogsModel> findAllByOrderByCreateDateDesc();
}
