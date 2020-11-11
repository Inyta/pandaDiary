package pers.yzh.pd.pd_front.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import pers.yzh.pd.pd_front.entity.dto.UserDTO;
import pers.yzh.pd.pd_front.entity.po.User;
import pers.yzh.pd.pd_front.service.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

/**
 * @author 杨子晗
 * @create 2020/8/11
 */
@RequestMapping("/diary")
@Controller
public class FrontController {
    @Autowired
    private UserService userService;

    @RequestMapping("/diaryLogin")
    public ModelAndView diaryLogin(@RequestBody UserDTO userDTO, HttpServletResponse response) {
        QueryWrapper<User> queryWrapper = new QueryWrapper();
        queryWrapper.eq("user_name", userDTO.getUserName());
        User user = userService.getOne(queryWrapper);
        String md5Password = DigestUtils.md5DigestAsHex(userDTO.getPassword().getBytes());
        System.out.println(md5Password);
        ModelAndView mav = new ModelAndView();
        if (user.getPassword().equals(md5Password)) {
            Cookie cookie = new Cookie("pd_userName", user.getUserName());
            response.addCookie(cookie);
            mav.setViewName("diary/calendar");
        } else {
            mav.setViewName("diary/error");
        }
        return mav;
    }

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
