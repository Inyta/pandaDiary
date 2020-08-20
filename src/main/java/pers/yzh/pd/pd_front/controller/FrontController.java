package pers.yzh.pd.pd_front.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 杨子晗
 * @create 2020/8/11
 */
@RequestMapping("/pd")
@RestController
public class FrontController {
    @RequestMapping("/hello")
    @ResponseBody
    public String helloWorld(){
        String str = "yy";
        return str;
    }
}
