import React, { useState, useEffect } from 'react';
import {
    Clock,
    FileText,
    ExternalLink,
    FileJson,
} from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';
import i18n from "../locales/i18n.ts";
import {useTranslation} from "react-i18next";

interface Position {
    x: number;
    y: number;
}

interface DraggableBlockProps {
    children: React.ReactNode;
    initialPos?: Position;
    className?: string;
    label?: string;
}

function DraggableBlock({ children, initialPos = { x: 0, y: 0 }, className = '', label }: DraggableBlockProps) {
    const [pos, setPos] = useState<Position>(initialPos);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - pos.x,
            y: e.clientY - pos.y
        });
    };

    useEffect(() => {

        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setPos({
                    x: e.clientX - dragStart.x,
                    y: e.clientY - dragStart.y
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart]);

    return (
        <div
            className={`mt-5 draggable block-shadow glass-effect moving-animation ${className}`}
            style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                position: 'relative',
                zIndex: isDragging ? 10 : 1
            }}
            onMouseDown={handleMouseDown}
        >
            {label && <div className="block-label">{label}</div>}
            {children}
        </div>
    );
}

const MainPage = () => {
    const [time, setTime] = React.useState(new Date());
    const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
    const [language, setLanguage] = useState(i18n.language);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleLanguageChange = () => setLanguage(i18n.language);

        i18n.on("languageChanged", handleLanguageChange); // Подписываемся на событие

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            i18n.off("languageChanged", handleLanguageChange); // Отписываемся при размонтировании
        }
    }, []);

    const { t } = useTranslation("mainPage");

    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen text-gray-300 p-4 overflow-hidden">
            <div
                className="cursor-glow"
                style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`
                }}
            />

            <div className="max-w-6xl mx-auto space-y-4 relative">
                {/* Top Bar with Time and Weather */}
                <div className="grid grid-cols-3 gap-4">
                    <DraggableBlock
                        className="flex items-center gap-3 p-3 rounded"
                        label="time.java"
                    >
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-mono">{time.toLocaleTimeString('en-US', { hour12: true })}</span>
                        <span className="text-xs text-gray-600">UTC+5</span>
                    </DraggableBlock>

                    <DraggableBlock
                        className="flex items-center gap-3 p-3 rounded"
                        label="date.java"
                    >
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-mono">
              {time.toLocaleDateString(language, {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
              })}
            </span>
                    </DraggableBlock>

                    <DraggableBlock
                        className="flex items-center gap-3 p-3 rounded"
                        label="weather.json"
                    >
                        <FileJson className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Пасмурно</span>
                        <span className="text-sm">1.9 °C</span>
                    </DraggableBlock>
                </div>

                {/* About Section */}
                <DraggableBlock
                    className="p-6 rounded"
                    label="about.md"
                >
                    <div className="flex items-start gap-6">
                        <img
                            src="./images/hans.jpg"
                            alt="Profile"
                            className="w-16 h-16 rounded-full"
                        />
                        <div className="space-y-4">
                            <div>
                                <h1 className="text-xl">{t("aboutTitle")} <a href="https://githubgithub.com/SudnDev" className="text-[#6b2fb3]">@SudnDev</a></h1>
                                <div className="flex gap-2 mt-3">
                                    <span className="bg-[#1E1E1E] px-3 py-1 rounded text-xs flex items-center">
                                      <img src="./icons/java-outline.svg" alt="Redis" className="w-4 h-4 mr-2" />
                                      Java
                                    </span>
                                    <span className="bg-[#1E1E1E] px-3 py-1 rounded text-xs flex items-center">
                                      <img src="./icons/spring-outline.svg" alt="Redis" className="w-3 h-3 mr-2" />
                                      Spring
                                    </span>
                                    <span className="bg-[#1E1E1E] px-3 py-1 rounded text-xs flex items-center">
                                      <img src="./icons/discord-outline.svg" alt="Redis" className="w-3 h-3 mr-2" />
                                      JDA
                                    </span>
                                    <span className="bg-[#1E1E1E] px-3 py-1 rounded text-xs flex items-center">
                                      <img src="./icons/apachekafka.svg" alt="Redis" className="w-3 h-3 mr-2" />
                                      Apache Kafka
                                    </span>
                                    <span className="bg-[#1E1E1E] px-3 py-1 rounded text-xs flex items-center">
                                      <img src="./icons/redis.svg" alt="Redis" className="w-3 h-3 mr-2" />
                                      Redis
                                    </span>
                                </div>
                            </div>
                            <p
                                className="text-gray-400 text-sm leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t("aboutDesc") }}
                            ></p>
                        </div>
                    </div>
                </DraggableBlock>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-4 moving-animation">
                    <a href='https://t.me/stoneDragonfly' target="_blank" rel="noopener noreferrer" className="block-shadow glass-effect flex items-center justify-center gap-2 hover:bg-[#2d1b3d] py-2 rounded transition-colors cursor-pointer">
                        <img src="./icons/telegram-outline.svg" alt="Telegram" className="w-5 h-5"/>
                        {t("contactMe")}
                    </a>
                    <a href='https://devbuddies.it.com' target="_blank" rel="noopener noreferrer" className="block-shadow glass-effect flex items-center justify-center gap-2 hover:bg-[#2d1b3d] py-2 rounded transition-colors">
                        <img src="./icons/infinity-outline.svg" alt="Telegram" className="w-5 h-5"/>
                        {t("studio")}
                    </a>
                    <button
                        className="block-shadow glass-effect flex items-center justify-center gap-2 hover:bg-[#2d1b3d] py-2 rounded transition-colors"
                        onClick={() => changeLanguage(language === 'en' ? 'ru' : 'en')}
                    >
                        <img src="./icons/language-outline.svg" alt="Telegram" className="w-5 h-5"/>
                        <span>{language === 'en' ? 'EN' : 'RU'}</span>
                    </button>
                </div>

                {/* Skills Section */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        {/* Github Calendar */}
                        <DraggableBlock
                            className="p-4 rounded"
                            label="github.io"
                        >
                            <div className="flex items-center gap-4">
                                <div className="-ml-1">
                                    <GitHubCalendar
                                        year={currentYear}
                                        username="SudnDev"
                                        colorScheme="dark"
                                        theme={{
                                            light: ['#f3e8ff', '#c084fc', '#a855f7', '#9333ea', '#7e22ce'],
                                            dark: ['#1e1b4b', '#4c1d95', '#6d28d9', '#8b5cf6', '#a78bfa'],
                                        }}
                                        blockSize={11}
                                        blockMargin={3}
                                        fontSize={16}
                                    />
                                </div>
                            </div>
                        </DraggableBlock>
                    </div>

                    <div className="space-y-4">
                        <DraggableBlock
                            className="p-4 rounded"
                            label="skills.md"
                        >
                            <h2 className="text-lg mb-4">Языки программирования</h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileJson className="w-4 h-4 text-orange-400" />
                                        <span className="text-sm">Java</span>
                                    </div>
                                    <span className="text-xs text-green-400">Active</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileJson className="w-4 h-4 text-blue-400" />
                                        <span className="text-sm">TypeScript</span>
                                    </div>
                                    <span className="text-xs text-yellow-400">In progress</span>
                                </div>
                            </div>
                        </DraggableBlock>

                        <DraggableBlock
                            className="p-4 rounded"
                            label="projects.json"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-lg">Просмотреть все проекты</h2>
                                <ExternalLink className="w-4 h-4 text-gray-500" />
                            </div>
                            <p className="text-sm text-gray-400">
                                Завершенные, в разработке, замороженные проекты. Здесь все мои проекты, включая личные и сайты на заказ
                            </p>
                        </DraggableBlock>
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center text-gray-600 text-xs py-4">
                    Copyright © 2023 SudnDev. Все права защищены. Скачивание, копирование и редактирование не допускается
                </footer>
            </div>
        </div>
    );
}

export default MainPage;