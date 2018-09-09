package com.loans.base;

import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.exceptions.ClientException;
import com.loans.message.ShortMessage;
import com.loans.pojo.Message;
import com.loans.service.MessageService;

import java.util.Date;

/**
 * @author seven
 * @create 2018-09-06 23:06
 **/
public class ThreadCode implements Runnable {

    private String phone;
    private MessageService messageService;

    public ThreadCode(String phone, MessageService messageService) {
        this.phone = phone;
        this.messageService = messageService;
    }

    @Override
    public void run() {
        SendSmsResponse response = null;
        try {
            response = ShortMessage.sendSms(phone);
            Thread.sleep(3000L);
        } catch (ClientException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        if (response.getCode() != null && response.getCode().equals("OK")) {
            Message message = new Message();
            message.setCode(response.getCode());
            message.setCreatetime(new Date());
            message.setId(Utils.createUUID());
            message.setIsValid(1); //默认有效
            message.setPhone(phone);
            messageService.insertMessage(message);
        }
    }


}
