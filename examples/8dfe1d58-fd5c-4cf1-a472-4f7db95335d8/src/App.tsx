import React, { useState, useCallback } from 'react';
import QRCode from 'qrcode.react';
import { Upload, Image as ImageIcon, Scan, Copy, Check, Link as LinkIcon } from 'lucide-react';

function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [qrValue, setQrValue] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);

  const handleFileUpload = useCallback(async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target?.result) {
        const base64Data = e.target.result as string;
        setImageUrl(base64Data);
        
        try {
          const formData = new FormData();
          formData.append('image', file);
          
          const response = await fetch('https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY', {
            method: 'POST',
            body: formData
          });
          
          const data = await response.json();
          if (data.data?.url) {
            setQrValue(data.data.url);
          } else {
            const blob = new Blob([file], { type: file.type });
            const blobUrl = URL.createObjectURL(blob);
            setQrValue(blobUrl);
          }
        } catch (error) {
          const blob = new Blob([file], { type: file.type });
          const blobUrl = URL.createObjectURL(blob);
          setQrValue(blobUrl);
        }
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(qrValue);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  }, [qrValue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            图片二维码生成器
          </h1>
          <p className="text-gray-600 text-lg">
            快速生成图片链接及二维码，便捷分享您的图片
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* 上传区域 */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
            <div
              className={`border-3 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50/50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="mb-4">
                <Upload className="w-16 h-16 mx-auto text-blue-500" />
              </div>
              <p className="text-gray-800 text-lg font-medium mb-2">
                拖拽图片到这里上传
              </p>
              <p className="text-gray-500 mb-6">
                或者点击下方按钮选择图片
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium cursor-pointer hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                选择图片
              </label>
            </div>

            {imageUrl && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-700 font-medium">图片预览</p>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    已上传
                  </span>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-inner">
                  <img
                    src={imageUrl}
                    alt="预览图"
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 二维码区域 */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
                <Scan className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                二维码生成
              </h3>
              {qrValue ? (
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                    <QRCode
                      value={qrValue}
                      size={200}
                      level="H"
                      includeMargin
                    />
                  </div>
                  <div className="mt-6 w-full max-w-md">
                    <div className="flex items-center gap-2 mb-2">
                      <LinkIcon className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-700 font-medium">
                        图片链接
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                      <input
                        type="text"
                        value={qrValue}
                        readOnly
                        className="flex-1 bg-transparent text-sm text-gray-800 outline-none px-2"
                      />
                      <button
                        onClick={copyToClipboard}
                        className="p-2 hover:bg-gray-200 rounded-md transition-colors flex items-center gap-1"
                        title={isCopied ? "已复制" : "复制链接"}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-500">已复制</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-500">复制</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 py-8">
                  <div className="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-200">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg">
                      请先上传图片
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      上传完成后将自动生成二维码
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;