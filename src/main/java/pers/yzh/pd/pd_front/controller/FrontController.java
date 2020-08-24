package pers.yzh.pd.pd_front.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pers.yzh.pd.pd_front.entity.model.Result;
import pers.yzh.pd.pd_front.entity.po.Diary;
import pers.yzh.pd.pd_front.service.DiaryService;

import java.util.List;

/**
 * @author 杨子晗
 * @create 2020/8/11
 */
@RequestMapping("/diary")
@Controller
public class FrontController {

    @RequestMapping("/hello")
    @ResponseBody
    public String helloWorld() {
        String str = "yyyy";
        return str;
    }

    @RequestMapping("/test")
    public String test() {
        return "diary/calendar";
    }
    @RequestMapping("/test1")
    public String test1() {
        return "index";
    }
}
