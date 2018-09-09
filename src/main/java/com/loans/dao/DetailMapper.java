package com.loans.dao;

import com.loans.pojo.Detail;

public interface DetailMapper {
    int deleteByPrimaryKey(String id);

    int insert(Detail record);

    int insertSelective(Detail record);

    Detail selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Detail record);

    int updateByPrimaryKey(Detail record);
}