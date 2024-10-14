import React, { useEffect, useState, useCallback, useRef } from 'react';
import './MinesweeperGame.css'

function MinesweeperGame() {
    const [board, setBoard] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [mineCount, setMineCount] = useState(10);
    const [rows, setRows] = useState(10);
    const [cols, setCols] = useState(10);
    const [mineFlag, setMineFlag] = useState(0) // 插旗数量
    const [gameDifficulty, setGameDifficulty] = useState(0) // 游戏难度
    const [systemWinWidth, setSystemWinWidth] = useState('500px') // 屏幕最小宽度

    // 初始化游戏板
    const generateEmptyBoard = (rows, cols) => {
        let board = [];
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < cols; j++) {
                board[i][j] = {
                    hasMine: false,
                    revealed: false,
                    flag: false,
                    mineCount: 0
                };
            }
        }
        return board;
    };

    // 随机放置地雷
    const addMines = useCallback((board, mineCount) => {
        let minesPlaced = 0;
        while (minesPlaced < mineCount) {
            let row = Math.floor(Math.random() * rows);
            let col = Math.floor(Math.random() * cols);
            if (!board[row][col].hasMine) {
                board[row][col].hasMine = true;
                minesPlaced++;
            }
        }
    }, [rows, cols]);

    // 计算每个方块周围的地雷数
    const calculateAdjacentMines = useCallback((board) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (!board[i][j].hasMine) {
                    let count = 0;
                    for (let x = -1; x <= 1; x++) {
                        for (let y = -1; y <= 1; y++) {
                            if (x === 0 && y === 0) continue;
                            if (i + x >= 0 && i + x < rows && j + y >= 0 && j + y < cols && board[i + x][j + y].hasMine) {
                                count++;
                            }
                        }
                    }
                    board[i][j].mineCount = count;
                }
            }
        }
    }, [rows, cols]);

    // 揭示方块
    const revealSquare = (row, col) => {
        if (gameOver || won) return;
        if (row < 0 || row >= rows || col < 0 || col >= cols) return;

        // 如果方块已经被揭示或标记了旗子，则不进行操作
        if (board[row][col].revealed || board[row][col].flag) return;

        board[row][col].revealed = true;

        if (board[row][col].hasMine) {
            setGameOver(true);
            setBoard([...board]); // 更新状态以触发重新渲染
            return;
        }

        if (board[row][col].mineCount === 0) {
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    if (x === 0 && y === 0) continue;
                    if (row + x >= 0 && row + x < rows && col + y >= 0 && col + y < cols && !board[row + x][col + y].revealed) {
                        revealSquare(row + x, col + y); // 递归揭示周围方块
                    }
                }
            }
        }

        setBoard([...board]); // 更新状态以触发重新渲染

        if (checkWinCondition()) {
            setWon(true);
        }
    };

    // 检查是否赢得游戏
    const checkWinCondition = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (!board[i][j].hasMine && !board[i][j].revealed) {
                    return false;
                }
            }
        }
        return true;
    };
    // 按压事件
    const touchStartRef = useRef(null);
    const handleTouchStart = () => {
        touchStartRef.current = Date.now();
    };

    const handleTouchEnd = (row, col) => {
        if (touchStartRef.current) {
            const duration = Date.now() - touchStartRef.current;
            if (duration > 500) { // 如果按压时间超过500毫秒
                // 在这里执行你的长按操作逻辑
                toggleFlag(row, col)
            }
            touchStartRef.current = null; // 重置引用
        }
    };
    // 标记/取消标记方块
    const toggleFlag = (row, col) => {
        if (gameOver || won) return;
        if (row < 0 || row >= rows || col < 0 || col >= cols) return;
        board[row][col].flag = !board[row][col].flag;
        if (board[row][col].flag) {
            setMineFlag(mineFlag + 1)
        } else {
            setMineFlag(mineFlag - 1)
        }
        setBoard([...board]);
    };

    // 重置游戏
    const resetGame = () => {
        const newBoard = generateEmptyBoard(rows, cols);
        setBoard(newBoard);
        addMines(newBoard, mineCount);
        calculateAdjacentMines(newBoard);
        setGameOver(false);
        setWon(false);
        setMineFlag(0)
    };

    // 难度改变
    const choseDifficulty = (e) => {
        setGameDifficulty(e)
    }

    // 监听 board 变化
    useEffect(() => {
        // console.log('Board Updated:', board); // 添加日志
    }, [board]);
    // 监听难度变化
    useEffect(() => {
        // 简单
        if (gameDifficulty === 0) {
            setMineCount(10)
            setRows(10)
            setCols(10)
            setSystemWinWidth('500px')
        }
        // 中等难度
        else if (gameDifficulty === 1) {
            setMineCount(80)
            setRows(18)
            setCols(20)
            setSystemWinWidth('800px')
        }
        // 困难难度
        else if (gameDifficulty === 2) {
            setMineCount(180)
            setRows(24)
            setCols(48)
            setSystemWinWidth('1700px')
        }
    }, [gameDifficulty])
    // 在组件挂载时初始化游戏板
    useEffect(() => {
        resetGame();
    }, [addMines, calculateAdjacentMines, cols, mineCount, rows]);

    return (
        <div className='MinesweeperGameMain' style={{ minWidth: systemWinWidth }}>
            <h1>扫雷游戏 MineSweeper</h1>
            <div className='showText'>💣数量：{mineCount}</div>
            <div className='showText'>🚩插旗：{mineFlag}</div>
            <div className='gameButtontGroup'>
                <div className='gameResetbutton' onClick={resetGame}>RESET</div>
                <div className={[gameDifficulty === 0 ? 'gameDifficultChoseBoxChose' : 'gameDifficultChoseBoxNotChose']} onClick={() => choseDifficulty(0)}>
                    <div className='gameDifficultChose'>EASY</div>
                </div>
                <div className={[gameDifficulty === 1 ? 'gameDifficultChoseBoxChose' : 'gameDifficultChoseBoxNotChose']} onClick={() => choseDifficulty(1)}>
                    <div className='gameDifficultChose'>MIDDLE</div>
                </div>
                <div className={[gameDifficulty === 2 ? 'gameDifficultChoseBoxChose' : 'gameDifficultChoseBoxNotChose']} onClick={() => choseDifficulty(2)}>
                    <div className='gameDifficultChose'>HARD</div>
                </div>
            </div>
            <table style={{ borderCollapse: 'collapse', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    gameOver ?
                        <div className='gameResult-lose'>
                            <div>
                                <div>Game Over</div>
                            </div>
                        </div>
                        : null
                }
                {
                    won ?
                        <div className='gameResult-win'>Win</div>
                        : null
                }
                <tbody>
                    {board.length > 0 && board.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex}
                                    onClick={() => revealSquare(rowIndex, colIndex)}
                                    onContextMenu={(e) => { e.preventDefault(); toggleFlag(rowIndex, colIndex); }}
                                    onTouchStart={()=>handleTouchStart()}
                                    onTouchEnd={()=>handleTouchEnd(rowIndex, colIndex)}
                                    className={[cell.revealed ? 'boxRevealed' : 'notRevealed', 'beseBox'].join(' ')}
                                >
                                    {cell.revealed ? (cell.hasMine ? '💣' : cell.mineCount > 0 ? cell.mineCount : '') : (cell.flag ? '🚩' : '')}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MinesweeperGame