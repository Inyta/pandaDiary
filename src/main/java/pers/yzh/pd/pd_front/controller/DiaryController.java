package pers.yzh.pd.pd_front.controller;
import	java.util.Date;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.lang.UUID;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pers.yzh.pd.pd_front.entity.dto.DiaryDTO;
import pers.yzh.pd.pd_front.entity.model.Result;
import pers.yzh.pd.pd_front.entity.po.Diary;
import pers.yzh.pd.pd_front.service.DiaryService;

import java.util.List;

/**
 * @Author: zhangwei
 * @Date: 2020/8/22 13:05
 */
@RestController
public class DiaryController {

    @Autowired
    private DiaryService diaryService;

    @GetMapping("/queryEventsList")
    public Result<List<Diary>> queryEventsList() {
        QueryWrapper<Diary> queryWrapper = new QueryWrapper();
        queryWrapper.eq("status", 1);
        List<Diary> list = diaryService.list(queryWrapper);
        return Result.success(list);
    }

    @PostMapping("/insertMemo")
    public Result<Void> insertMemo(@RequestBody DiaryDTO diaryDTO) {
        Diary diary = new Diary();
        BeanUtil.copyProperties(diaryDTO,diary);
        String id = "memo"+UUID.randomUUID().toString();
        diary.setId(id);
        diary.setUpdateTime(new Date());
        diary.setStatus("0");
        diaryService.save(diary);
        return Result.success();
    }
}
