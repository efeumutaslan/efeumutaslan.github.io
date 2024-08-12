# Tanıtım

[![Language](https://img.shields.io/badge/Jekyll-Theme-blue)](https://github.com/TMaize/tmaize-blog)
[![license](https://img.shields.io/github/license/TMaize/tmaize-blog)](https://github.com/TMaize/tmaize-blog)
[![GitHub stars](https://img.shields.io/github/stars/TMaize/tmaize-blog?style=social)](https://github.com/TMaize/tmaize-blog)

Bir jekyll teması ([GitHub Adresi](https://github.com/TMaize/tmaize-blog)), basit ve temiz (tema kaynak talepleri <20KB), hiçbir çerçeve kullanılmamış, sayfalar anında açılıyor, duyarlı tasarım destekli, tam metin arama destekli, gece modu destekli.

Temanın etkisini görmek için [TMaize Blog](https://blog.tmaize.net/) adresini ziyaret edebilirsiniz, dost bağlantılar eklemeye de hoş geldiniz.

## Teşekkürler

[JetBrains](https://www.jetbrains.com/?from=tmaize-blog) tarafından ücretsiz sağlanan geliştirme araçları [![JetBrains](./static/img/jetbrains.svg)](https://www.jetbrains.com/?from=tmaize-blog)

[Gece Modu Kod Vurgulama Renk Şeması](https://github.com/mgyongyosi/OneDarkJekyll)

# Yerel Olarak Çalıştırma

Genellikle GitHub'a gönderim yaptıktan birkaç saniye sonra sonucu görebilirsiniz. Eğer yerel olarak sonucu görmek isterseniz, Ruby ortamını ve bağımlılıklarını kurmanız gerekir.

Windows'da WSL üzerinden Ruby yüklemenizi öneririm, sadece şu komutu çalıştırmanız yeterli: `apt install build-essential ruby ruby-dev`.

```bash
# gem sources --remove https://rubygems.org/
# gem sources -a https://mirrors.tuna.tsinghua.edu.cn/rubygems/
# gem sources -l
# gem sources --clear-all
# gem sources --update
gem install bundler
# bundle config mirror.https://rubygems.org https://mirrors.tuna.tsinghua.edu.cn/rubygems
# bundle config list
bundle install
```

Projenizi başlatmak/derlemek için aşağıdaki komutları kullanabilirsiniz:

```bash
bundle exec jekyll serve --watch --host=127.0.0.1 --port=8080
bundle exec jekyll build --destination=dist
```

Eğer kod vurgulama stilini değiştirmek isterseniz, aşağıdaki komutları kullanarak CSS oluşturabilirsiniz:

```bash
rougify help style
rougify style github > highlighting.css
```

# Proje Yapılandırması

1. Kendi alan adınızı kullanacaksanız, `CNAME` dosyasındaki içeriği kendi alan adınızla değiştirin ve CNAME'yi `kullanıcıadı.github.com`'a yönlendirin.

2. GitHub'ın alan adını kullanacaksanız, `CNAME` dosyasını silin ve projenizi `kullanıcıadı.github.io` olarak değiştirin.

3. `pages/about.md` dosyasındaki "hakkımda" bölümünü düzenleyin.

4. `_config.yml` dosyasını düzenleyin, detaylı bilgi için yorumları inceleyin.

5. `posts` ve `_posts` dizinlerindeki tüm dosyaları silin, ancak bu iki dizini silmeyin.

6. Sitenin logosu ve favicon'u `static/img/` dizininde bulunur, bunları değiştirin. Boyut önemli değil ama resimlerin oranı 1:1 olursa iyi olur.

7. Projeyi fork ettiyseniz ve benim commit kayıtlarımı silmek isterseniz aşağıdaki komutları kullanabilirsiniz:

   ```
   git checkout --orphan temp
   git add . && git commit -m init
   git branch -D master
   git branch -m temp master
   git push --force
   ```

# Kullanım

Makaleler `_posts` dizininde yer alır, `yyyy-MM-dd-xxxx-xxxx.md` formatında adlandırılmalıdır. İçerik formatı şu şekildedir:

```yaml
---
layout: mypost
title: Başlık
categories: [Kategori1, Kategori2]
---
Makale içeriği, Markdown formatında
```

Makalelerin kaynakları posts dizininde yer alır. Örneğin makale dosya adı `2019-05-01-theme-usage.md` ise, bu makalenin kaynakları `posts/2019/05/01` dizinine yerleştirilmelidir. Makale içinde bu kaynaklara doğrudan atıfta bulunabilirsiniz. Yazarken kaynakların var olmadığını belirten uyarıları göz ardı edebilirsiniz.

```md
![Bu bir resimdir](xxx.png)

[xxx.zip İndir](xxx.zip)
```
