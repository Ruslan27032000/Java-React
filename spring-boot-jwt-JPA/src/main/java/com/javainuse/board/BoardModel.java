package com.javainuse.board;

import javax.persistence.*;

@Entity(name = "boards")
public class BoardModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    public Long id;

    @Column(name = "title", nullable = false)
    public String title;

    @Column(name = "board_id", nullable = false,length = 3000,columnDefinition = "TEXT")
    public String boardId;

    protected BoardModel() {
    }

    public BoardModel(Long id, String title, String boardId) {
        this.id = id;
        this.title = title;
        this.boardId = boardId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBoardId() {
        return boardId;
    }

    public void setBoardId(String boardId) {
        this.boardId = boardId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
