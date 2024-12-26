document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const studentNameInput = document.getElementById('studentName');
    const generateBtn = document.getElementById('generate');
    const copyBtn = document.getElementById('copy');
    const resultArea = document.getElementById('result');
    
    // 添加历史记录相关元素
    const historySection = document.getElementById('history');
    const historyList = document.querySelector('.history-list');
    const clearHistoryBtn = document.getElementById('clearHistory');
    const downloadHistoryBtn = document.getElementById('downloadHistory');
    
    // 导航处理
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main > section');
    
    // 显示指定区域的函数
    function showSection(targetId) {
        // 更新导航激活状态
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // 显示对应区域
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
        
        // 如果切换到历史记录，刷新显示
        if (targetId === 'history') {
            refreshHistoryList();
        }
    }
    
    // 导航切换
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            showSection(targetId);
        });
    });
    
    // 生成评语
    generateBtn.addEventListener('click', function() {
        const name = studentNameInput.value;
        const style = document.querySelector('input[name="style"]:checked').value;
        
        // 收集选中的优点和待改善项
        const strengths = [];
        const improvements = [];
        
        document.querySelectorAll('input[name^="strengths-"]:checked').forEach(input => {
            strengths.push(input.value);
        });
        
        document.querySelectorAll('input[name^="improvements-"]:checked').forEach(input => {
            improvements.push(input.value);
        });
        
        // 生成评语
        let comment = generateComment(name, strengths, improvements, style);
        
        // 显示结果
        resultArea.value = comment;
    });
    
    // 复制功能
    copyBtn.addEventListener('click', function() {
        const textarea = document.getElementById('result');
        textarea.select();
        document.execCommand('copy');
    });
    
    // 清空历史记录
    clearHistoryBtn.addEventListener('click', function() {
        if (confirm('确定要清空所有历史记录吗？')) {
            localStorage.removeItem('commentHistory');
            refreshHistoryList();
        }
    });
    
    // 保存到历史记录
    function saveToHistory(record) {
        let history = JSON.parse(localStorage.getItem('commentHistory') || '[]');
        history.unshift(record); // 添加到开头
        if (history.length > 50) { // 最多保存50条
            history = history.slice(0, 50);
        }
        localStorage.setItem('commentHistory', JSON.stringify(history));
    }
    
    // 刷新历史记录列表
    function refreshHistoryList() {
        const history = JSON.parse(localStorage.getItem('commentHistory') || '[]');
        historyList.innerHTML = '';
        
        if (history.length === 0) {
            historyList.innerHTML = '<p class="empty-message">暂无历��记录</p>';
            return;
        }
        
        history.forEach((record, index) => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div class="comment">${record.comment}</div>
                <div class="meta">
                    ${record.name} | ${new Date(record.timestamp).toLocaleString()}
                </div>
                <div class="actions">
                    <button class="copy-btn" data-index="${index}">复制</button>
                    <button class="delete-btn" data-index="${index}">删除</button>
                </div>
            `;
            historyList.appendChild(item);
            
            // 添加复制和删除功能
            item.querySelector('.copy-btn').addEventListener('click', () => {
                navigator.clipboard.writeText(record.comment).then(() => {
                    alert('评语已复制到剪贴板');
                });
            });
            
            item.querySelector('.delete-btn').addEventListener('click', () => {
                let history = JSON.parse(localStorage.getItem('commentHistory') || '[]');
                history.splice(index, 1);
                localStorage.setItem('commentHistory', JSON.stringify(history));
                refreshHistoryList();
            });
        });
    }
    
    // 添加下载按钮事件监听
    downloadHistoryBtn.addEventListener('click', function() {
        const history = JSON.parse(localStorage.getItem('commentHistory') || '[]');
        if (history.length === 0) {
            alert('暂无历史记录可下载');
            return;
        }
        
        // 生成下载内容
        let content = '评语历史记录\n\n';
        history.forEach((record, index) => {
            content += `${index + 1}. ${record.name}\n`;
            content += `时间：${new Date(record.timestamp).toLocaleString()}\n`;
            content += `评语：${record.comment}\n`;
            content += '----------------------------------------\n\n';
        });
        
        // 创建下载链接
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `评语记录_${new Date().toLocaleDateString()}.txt`;
        
        // 触发下载
        document.body.appendChild(a);
        a.click();
        
        // 清理
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    });
    
    // 初始化显示生成器页面
    showSection('generator');
});

// 修改生成评语的函数
function generateComment(name, style, dimensions) {
    const template = templates[style];
    const studentName = name ? name + '同学' : '这位同学';
    
    // 分别取优点和待改善的评价
    const strengths = [];
    const improvements = [];
    
    // 处理所有选中的维度
    document.querySelectorAll('.dimension-item input:checked').forEach(input => {
        const value = input.value;
        const dimensionName = input.name.split('-')[1]; // 获取维度名称
        const type = input.name.split('-')[0]; // 获取类型（strengths 或 improvements）
        
        if (template[dimensionName] && template[dimensionName][value]) {
            if (type === 'strengths') {
                strengths.push(template[dimensionName][value]);
            } else if (type === 'improvements') {
                improvements.push(template[dimensionName][value]);
            }
        }
    });
    
    // 生成三段式评语
    let comment = '';
    
    // 第一段：开头 + 优点陈述
    comment += randomPick(template.start).replace('{name}', studentName);
    if (strengths.length > 0) {
        comment += strengths.join(' ');
    }
    
    // 第二段：待改善部分（如果有）
    if (improvements.length > 0) {
        comment += '\n\n';
        if (style === 'praise') {
            comment += '同时，希望在以下方面继续努力：';
        } else if (style === 'encourage') {
            comment += '接下来，我们可以一���努力改善：';
        } else {
            comment += '建议在以下方面多加注意：';
        }
        comment += improvements.join(' ');
    }
    
    // 第三段：结尾祝福
    comment += '\n\n';
    comment += randomPick(template.end);
    
    return comment;
}

// 随机选择数组中的一个元素
function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
} 