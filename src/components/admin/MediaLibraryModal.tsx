'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Check,
  Search,
  RefreshCw,
  X,
  Sparkles,
  Copy,
  ArrowRight,
  Layers
} from 'lucide-react';
import { MediaItem } from '@/app/api/media/route';

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia?: (url: string) => void;
  title?: string;
  subtitle?: string;
}

export default function MediaLibraryModal({
  isOpen,
  onClose,
  onSelectMedia,
  title = 'Biblioteca de Mídias 9:16',
  subtitle = 'Gerencie e selecione mídias cinematográficas para a Vitrine',
}: MediaLibraryModalProps) {
  const [activeTab, setActiveTab] = useState<'gallery' | 'upload'>('gallery');
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [folderFilter, setFolderFilter] = useState<'ALL' | 'uploads' | 'imagens'>('ALL');
  
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/media');
      if (res.ok) {
        const data = await res.json();
        setMediaList(data);
      }
    } catch (err) {
      console.error('Erro ao buscar mídias:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    let lastUploadedUrl = '';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const result = await res.json();
          lastUploadedUrl = result.url;
        }
      } catch (err) {
        console.error('Erro no upload de arquivo:', err);
      }
    }

    setIsUploading(false);
    await fetchMedia();

    // If we were in select mode and uploaded a file, auto select the uploaded file if desired
    if (onSelectMedia && lastUploadedUrl) {
      setActiveTab('gallery');
    } else {
      setActiveTab('gallery');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleDeleteMedia = async (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Tem certeza que deseja excluir esta mídia da biblioteca?')) return;

    setMediaList((prev) => prev.filter((m) => m.url !== url));

    try {
      const res = await fetch(`/api/media?url=${encodeURIComponent(url)}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        fetchMedia(); // Rollback if error
      }
    } catch (err) {
      console.error('Erro ao deletar mídia:', err);
      fetchMedia();
    }
  };

  const handleCopyUrl = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const filteredMedia = mediaList.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesFolder = folderFilter === 'ALL' || m.folder === folderFilter;
    return matchesSearch && matchesFolder;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-2xl space-y-6 my-6 max-h-[90vh] flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[var(--border-subtle)] pb-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-cyan)] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{onSelectMedia ? 'Modo de Seleção de Mídia' : 'Gerenciamento de Ativos 9:16'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {title}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-mono">
              {subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[var(--bg-main)] text-[var(--text-muted)] hover:text-white border border-[var(--border-subtle)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 shrink-0 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-colors flex items-center gap-2 ${
                activeTab === 'gallery'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-[var(--bg-main)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Galeria de Mídias ({filteredMedia.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-colors flex items-center gap-2 ${
                activeTab === 'upload'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-[var(--bg-main)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload de Mídias 9:16</span>
            </button>
          </div>

          {activeTab === 'gallery' && (
            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar arquivo..."
                  className="w-full pl-8 pr-3 py-1.5 bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg text-xs text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-cyan)] font-mono"
                />
              </div>

              <button
                onClick={fetchMedia}
                className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-main)] text-[var(--text-secondary)] hover:text-white transition-colors"
                title="Atualizar Biblioteca"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          )}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto pr-1 min-h-[350px]">
          {activeTab === 'upload' ? (
            /* Upload Zone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[350px] space-y-4 ${
                dragActive
                  ? 'border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 scale-[0.99]'
                  : 'border-[var(--border-subtle)] hover:border-white/40 bg-[var(--bg-main)]/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
              />

              <div className="p-4 rounded-full bg-white/5 border border-white/10 text-[var(--accent-cyan)]">
                <Upload className="w-8 h-8" />
              </div>

              <div className="space-y-1 max-w-sm">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Arraste mídias 9:16 ou clique para enviar
                </h3>
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  Suporta arquivos PNG, JPG, WEBP e GIF em alta definição. Otimizado para proporção vertical 9:16.
                </p>
              </div>

              {isUploading && (
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-cyan)] animate-pulse pt-4">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processando e salvando na biblioteca...</span>
                </div>
              )}
            </div>
          ) : (
            /* Gallery Grid */
            <div>
              {loading ? (
                <div className="py-20 text-center text-xs font-mono text-[var(--text-muted)] animate-pulse">
                  Carregando biblioteca de mídias...
                </div>
              ) : filteredMedia.length === 0 ? (
                <div className="py-20 border border-dashed border-[var(--border-subtle)] rounded-2xl text-center space-y-3">
                  <ImageIcon className="w-8 h-8 text-[var(--text-muted)] mx-auto opacity-40" />
                  <p className="text-xs font-mono text-[var(--text-muted)]">
                    Nenhuma mídia encontrada na biblioteca.
                  </p>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs font-mono inline-flex items-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Fazer Primeiro Upload</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredMedia.map((media) => (
                    <div
                      key={media.url}
                      onClick={() => onSelectMedia && onSelectMedia(media.url)}
                      className={`group relative bg-black rounded-xl border border-[var(--border-subtle)] overflow-hidden aspect-[9/16] flex flex-col justify-between transition-all ${
                        onSelectMedia
                          ? 'cursor-pointer hover:border-[var(--accent-cyan)] hover:scale-[1.02] hover:shadow-lg'
                          : ''
                      }`}
                    >
                      {/* Image Frame */}
                      <Image
                        src={media.url}
                        alt={media.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />

                      {/* Top Overlay Badge */}
                      <div className="relative z-10 p-2 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-black/80 to-transparent">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-black/80 text-zinc-300 border border-white/10 truncate max-w-[90px]">
                          {media.folder}
                        </span>

                        <div className="flex gap-1">
                          <button
                            onClick={(e) => handleCopyUrl(media.url, e)}
                            className="p-1 rounded bg-black/80 text-white hover:text-[var(--accent-cyan)] border border-white/20 transition-colors"
                            title="Copiar URL"
                          >
                            <Copy className="w-3 h-3" />
                          </button>

                          {media.folder === 'uploads' && (
                            <button
                              onClick={(e) => handleDeleteMedia(media.url, e)}
                              className="p-1 rounded bg-rose-950/80 text-rose-300 hover:text-rose-100 border border-rose-500/30 transition-colors"
                              title="Excluir Arquivo"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Selection Overlay Effect */}
                      {onSelectMedia ? (
                        <div className="relative z-10 p-3 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end text-center space-y-1">
                          <span className="text-[10px] font-mono text-zinc-300 truncate block">
                            {media.name}
                          </span>
                          <button className="w-full py-1.5 rounded-lg bg-white text-black font-bold text-[11px] font-mono group-hover:bg-[var(--accent-cyan)] group-hover:text-black transition-colors flex items-center justify-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Selecionar para Card</span>
                          </button>
                        </div>
                      ) : (
                        <div className="relative z-10 p-2 bg-gradient-to-t from-black/90 to-transparent text-[10px] font-mono text-zinc-400 truncate">
                          {media.name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex justify-between items-center shrink-0">
          <div className="text-[11px] font-mono text-[var(--text-muted)]">
            {copiedUrl && <span className="text-emerald-400">URL copiada para a área de transferência!</span>}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-[var(--border-subtle)] text-xs text-white hover:bg-white/10 font-mono transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
