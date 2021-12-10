<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <top-bar />
    <img class="background-img" src="../assets/images/1.jpg" alt />

    <div style="margin: 50px" />
    <el-card id="announce-card">
      <el-collapse accordion>
        <el-collapse-item v-for="i in 3" :key="i">
          <template slot="title">
            <p style="font-size: 30px">一致性 Consistency</p>
          </template>
          <v-md-editor mode="preview" v-model="activeName" />
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import TopBar from "@/components/Bar/bar";
export default {
  name: "Announce",
  components: { TopBar },
  data() {
    return {
      activeName:
        "死信队列：消费失败的消息存放的队列。消息消费失败的原因：\n" +
        "\n" +
        "- 消息被拒绝并且消息没有重新入队（requeue=false）\n" +
        "- 消息超时未消费\n" +
        "- 达到最大队列长度\n" +
        "\n" +
        "设置死信队列的 exchange 和 queue，然后进行绑定：\n" +
        "\n" +
        "```java\n" +
        "\t@Bean\n" +
        "    public DirectExchange dlxExchange() {\n" +
        "        return new DirectExchange(RabbitMqConfig.DLX_EXCHANGE);\n" +
        "    }\n" +
        "\n" +
        "    @Bean\n" +
        "    public Queue dlxQueue() {\n" +
        "        return new Queue(RabbitMqConfig.DLX_QUEUE, true);\n" +
        "    }\n" +
        "\n" +
        "    @Bean\n" +
        "    public Binding bindingDeadExchange(Queue dlxQueue, DirectExchange deadExchange) {\n" +
        "        return BindingBuilder.bind(dlxQueue).to(deadExchange).with(RabbitMqConfig.DLX_QUEUE);\n" +
        "    }\n" +
        "```\n" +
        "\n" +
        "在普通队列加上两个参数，绑定普通队列到死信队列。当消息消费失败时，消息会被路由到死信队列。\n" +
        "\n" +
        "```java\n" +
        "    @Bean\n" +
        "    public Queue sendSmsQueue() {\n" +
        "        Map<String,Object> arguments = new HashMap<>(2);\n" +
        "        // 绑定该队列到私信交换机\n" +
        '        arguments.put("x-dead-letter-exchange", RabbitMqConfig.DLX_EXCHANGE);\n' +
        '        arguments.put("x-dead-letter-routing-key", RabbitMqConfig.DLX_QUEUE);\n' +
        "        return new Queue(RabbitMqConfig.MAIL_QUEUE, true, false, false, arguments);\n" +
        "    }\n" +
        "```\n" +
        "\n" +
        "生产者完整代码：\n" +
        "\n" +
        "```java\n" +
        "@Component\n" +
        "@Slf4j\n" +
        "public class MQProducer {\n" +
        "\n" +
        "    @Autowired\n" +
        "    RabbitTemplate rabbitTemplate;\n" +
        "\n" +
        "    @Autowired\n" +
        "    RandomUtil randomUtil;\n" +
        "\n" +
        "    @Autowired\n" +
        "    UserService userService;\n" +
        "\n" +
        "    final RabbitTemplate.ConfirmCallback confirmCallback = (CorrelationData correlationData, boolean ack, String cause) -> {\n" +
        '            log.info("correlationData: " + correlationData);\n' +
        '            log.info("ack: " + ack);\n' +
        "            if(!ack) {\n" +
        '                log.info("异常处理....");\n' +
        "            }\n" +
        "    };\n" +
        "\n" +
        "\n" +
        "    final RabbitTemplate.ReturnCallback returnCallback = (Message message, int replyCode, String replyText, String exchange, String routingKey) ->\n" +
        '            log.info("return exchange: " + exchange + ", routingKey: "\n' +
        '                    + routingKey + ", replyCode: " + replyCode + ", replyText: " + replyText);\n' +
        "\n" +
        "    public void sendMail(String mail) {\n" +
        "        //貌似线程不安全 范围100000 - 999999\n" +
        "        Integer random = randomUtil.nextInt(100000, 999999);\n" +
        "        Map<String, String> map = new HashMap<>(2);\n" +
        "        String code = random.toString();\n" +
        '        map.put("mail", mail);\n' +
        '        map.put("code", code);\n' +
        "\n" +
        "        MessageProperties mp = new MessageProperties();\n" +
        "        //在生产环境中这里不用Message，而是使用 fastJson 等工具将对象转换为 json 格式发送\n" +
        '        Message msg = new Message("tyson".getBytes(), mp);\n' +
        '        msg.getMessageProperties().setExpiration("3000");\n' +
        "        //如果消费端要设置为手工 ACK ，那么生产端发送消息的时候一定发送 correlationData ，并且全局唯一，用以唯一标识消息。\n" +
        '        CorrelationData correlationData = new CorrelationData("1234567890"+new Date());\n' +
        "\n" +
        "        rabbitTemplate.setMandatory(true);\n" +
        "        rabbitTemplate.setConfirmCallback(confirmCallback);\n" +
        "        rabbitTemplate.setReturnCallback(returnCallback);\n" +
        "        rabbitTemplate.convertAndSend(RabbitMqConfig.MAIL_QUEUE, msg, correlationData);\n" +
        "\n" +
        "        //存入redis\n" +
        "        userService.updateMailSendState(mail, code, MailConfig.MAIL_STATE_WAIT);\n" +
        "    }\n" +
        "}\n" +
        "```\n" +
        "\n" +
        "消费者完整代码：\n" +
        "\n" +
        "```java\n" +
        "@Slf4j\n" +
        "@Component\n" +
        "public class DeadListener {\n" +
        "\n" +
        "    @RabbitListener(queues = RabbitMqConfig.DLX_QUEUE)\n" +
        "    public void onMessage(Message message, Channel channel) throws IOException {\n" +
        "\n" +
        "        try {\n" +
        "            Thread.sleep(5000);\n" +
        "        } catch (InterruptedException e) {\n" +
        "            e.printStackTrace();\n" +
        "        }\n" +
        "        long deliveryTag = message.getMessageProperties().getDeliveryTag();\n" +
        "        //手工ack\n" +
        "        channel.basicAck(deliveryTag,false);\n" +
        '        System.out.println("receive--1: " + new String(message.getBody()));\n' +
        "    }\n" +
        "}\n" +
        "```\n" +
        "\n" +
        "当普通队列中有死信时，RabbitMQ 就会自动的将这个消息重新发布到设置的死信交换机去，然后被路由到死信队列。可以监听死信队列中的消息做相应的处理。",
    };
  },
};
</script>

<style lang="less" scoped>
#announce-card {
  width: 150vh;
}
</style>
