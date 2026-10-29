# 会话中文命名规则 (Mandatory Chinese Conversation Naming)

- **当前工作区强制要求**：在 `pswpswpsw.github.io` 项目中进行的一切会话，其标题必须始终为纯中文。
- **首次响应与任务完成动作**：新会话开始或任务执行完成后，Agent 必须检查并确保当前对话标题已总结为自然、简洁的中文，严禁使用英文默认名称。
- **同步执行方式**：直接调用全局技能 `conversation-renamer` 或执行 ConnectRPC 写入磁盘与数据库同步。
