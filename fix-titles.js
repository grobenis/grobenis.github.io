// 统一文章标题规范：中英文空格 / 专有名词大小写 / 专业命名
const fs = require('fs');
const path = require('path');

const postsDir = 'd:/Blog/source/_posts';

// 原始 title 值 → 新 title 值（精确匹配 front-matter title 行）
const TITLE_MAP = {
  'Markdown语法简介': 'Markdown 语法简介',
  '发布IMU信息到ROS系统中': '发布 IMU 信息到 ROS 系统',
  '利用ROS标定相机步骤与方法': '使用 ROS 工具标定相机',
  '使用evo工具评测SLAM': '使用 evo 工具评测 SLAM',
  '利用Kalibr标定双目相机与IMU': '使用 Kalibr 标定双目相机与 IMU',
  'VINS-Fusion代码阅读': 'VINS-Fusion 代码阅读',
  'SLAM各算法运行方法与过程': 'SLAM 各算法运行方法与过程',
  'Kalman滤波器学习': 'Kalman 滤波器学习',
  '哈希表与C++': '哈希表与 C++',
  'SLAM中的三角测量': 'SLAM 中的三角测量',
  'SLAM初始化': 'SLAM 初始化',
  'SLAM中的后端优化': 'SLAM 中的后端优化',
  'OPENCV重要函数': 'OpenCV 重要函数',
  '特征点法的巅峰之作—ORBSLAM2': 'ORB-SLAM2 学习笔记',
  'C++多线程编程': 'C++ 多线程编程',
  'SLAM概述': 'SLAM 概述',
  'C++容器Vector': 'C++ 容器 vector',
  'C++位运算': 'C++ 位运算',
  'C++树': 'C++ 树',
  'C++正则表达式': 'C++ 正则表达式',
  'Cmake指令手册': 'CMake 指令手册',
  'SLAM中常用的角点检测算法': 'SLAM 中常用的角点检测算法',
  '回环检测与DBoW2库': '回环检测与 DBoW2 库',
  '通过NDK打包aar格式的SDK': '通过 NDK 打包 aar 格式的 SDK',
  'Nerf论文学习': 'NeRF 论文学习',
  "'HTTP协议'": 'HTTP 协议',
  '传感器的标定': '相机标定原理',
  '可穿戴领域中的压力监测算法': '可穿戴设备压力监测算法',
};

let changed = 0;
for (const file of fs.readdirSync(postsDir)) {
  if (!file.endsWith('.md')) continue;
  const p = path.join(postsDir, file);
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  let fileChanged = false;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^title:\s*(.*)$/);
    if (m) {
      const oldTitle = m[1].trim();
      if (TITLE_MAP[oldTitle] !== undefined) {
        lines[i] = 'title: ' + TITLE_MAP[oldTitle];
        console.log(`${file}: "${oldTitle}" -> "${TITLE_MAP[oldTitle]}"`);
        fileChanged = true;
        changed++;
      }
      break; // 只处理第一个 title 行
    }
  }
  if (fileChanged) fs.writeFileSync(p, lines.join('\n'), 'utf8');
}
console.log(`\n共修改 ${changed} 处标题`);
