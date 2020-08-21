package pers.yzh.pd.pd_front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 杨子晗
 * @create 2020/8/11
 */
@RequestMapping("/pd")
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
        return "calendar";
    }
}
