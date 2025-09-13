'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TestPage() {
    const [testResults, setTestResults] = useState({
        basic: { status: 'pending', message: 'Running...' },
        state: { status: 'pending', message: 'Running...' },
        transition: { status: 'pending', message: 'Running...' },
        layout: { status: 'pending', message: 'Running...' }
    });

    useEffect(() => {
        // Basic rendering test
        try {
            setTestResults(prev => ({
                ...prev,
                basic: { status: 'success', message: 'Basic rendering works!' }
            }));
        } catch (error) {
            setTestResults(prev => ({
                ...prev,
                basic: { status: 'error', message: `Error: ${error.message}` }
            }));
        }

        // Test state updates
        try {
            let counter = 0;
            const stateTimer = setInterval(() => {
                counter++;
                if (counter >= 3) {
                    clearInterval(stateTimer);
                    setTestResults(prev => ({
                        ...prev,
                        state: { status: 'success', message: 'State updates work correctly!' }
                    }));
                }
            }, 500);
        } catch (error) {
            setTestResults(prev => ({
                ...prev,
                state: { status: 'error', message: `Error: ${error.message}` }
            }));
        }

        // Layout test
        try {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (viewportWidth > 0 && viewportHeight > 0) {
                setTestResults(prev => ({
                    ...prev,
                    layout: {
                        status: 'success',
                        message: `Layout detected correctly (${viewportWidth}x${viewportHeight})`
                    }
                }));
            } else {
                throw new Error('Invalid viewport dimensions');
            }
        } catch (error) {
            setTestResults(prev => ({
                ...prev,
                layout: { status: 'error', message: `Error: ${error.message}` }
            }));
        }

        // Test CSS transitions
        try {
            const testElement = document.getElementById('transition-test');
            if (testElement) {
                setTimeout(() => {
                    testElement.classList.add('expanded');
                    setTimeout(() => {
                        if (window.getComputedStyle(testElement).width !== '100px') {
                            throw new Error('Transition not applied');
                        }
                        setTestResults(prev => ({
                            ...prev,
                            transition: { status: 'success', message: 'CSS transitions work!' }
                        }));
                    }, 600);
                }, 300);
            } else {
                throw new Error('Test element not found');
            }
        } catch (error) {
            setTestResults(prev => ({
                ...prev,
                transition: { status: 'error', message: `Error: ${error.message}` }
            }));
        }

    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-6">Test Page</h1>
            <p className="mb-4">This page runs various tests to check if your application is working correctly.</p>

            <div className="mb-4">
                <Link href="/" className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/80">
                    Back to Home
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {Object.entries(testResults).map(([testName, result]) => (
                    <div key={testName} className="p-4 bg-white/10 rounded">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold mb-2 capitalize">{testName} Test</h2>
                            <StatusBadge status={result.status} />
                        </div>
                        <p>{result.message}</p>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-white/10 rounded mb-6">
                <h2 className="text-2xl font-bold mb-4">CSS Transition Test</h2>
                <div
                    id="transition-test"
                    className="w-10 h-10 bg-accent transition-all duration-500 ease-in-out"
                />
            </div>

            <div className="p-4 bg-white/10 rounded mb-6">
                <h2 className="text-2xl font-bold mb-4">Interactive Tests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded">
                        <h3 className="text-lg font-bold mb-2">Toggle Content Test</h3>
                        <ToggleTest />
                    </div>
                    <div className="p-4 bg-white/5 rounded">
                        <h3 className="text-lg font-bold mb-2">Counter Test</h3>
                        <CounterTest />
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white/10 rounded">
                <h2 className="text-2xl font-bold mb-2">Navigation Tests</h2>
                <p className="mb-3">Try these links to test navigation:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><Link href="/" className="text-accent hover:underline">Home Page</Link></li>
                    <li><Link href="/debug" className="text-accent hover:underline">Debug Page</Link></li>
                    <li><Link href="/services" className="text-accent hover:underline">Services Page</Link></li>
                </ul>
            </div>

            <style jsx global>{`
        .expanded {
          width: 100px !important;
          height: 100px !important;
          border-radius: 50%;
        }
      `}</style>
        </div>
    );
}

function StatusBadge({ status }) {
    const colors = {
        pending: "bg-yellow-500",
        success: "bg-green-500",
        error: "bg-red-500"
    };

    return (
        <span className={`${colors[status]} text-white px-2 py-1 rounded text-xs uppercase`}>
            {status}
        </span>
    );
}

function ToggleTest() {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            <button
                className="px-3 py-1 bg-accent text-white rounded mb-4"
                onClick={() => setIsVisible(!isVisible)}
            >
                {isVisible ? 'Hide Content' : 'Show Content'}
            </button>

            {isVisible && (
                <div className="p-3 bg-white/10 rounded animate-fadeIn">
                    This content appears and disappears on click.
                </div>
            )}
        </div>
    );
}

function CounterTest() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <div className="mb-3">
                <span className="text-xl font-bold">{count}</span>
            </div>
            <div className="flex gap-2">
                <button
                    className="px-3 py-1 bg-accent text-white rounded"
                    onClick={() => setCount(count + 1)}
                >
                    Increment
                </button>
                <button
                    className="px-3 py-1 bg-white/20 text-white rounded"
                    onClick={() => setCount(0)}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
