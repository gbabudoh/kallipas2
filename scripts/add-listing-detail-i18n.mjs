import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const filePath = resolve(process.cwd(), 'lib/i18n/index.ts')
let content = readFileSync(filePath, 'utf-8')

// ── Translation data ──────────────────────────────────────────────────────────

const newKeys = {
  en: `    breadcrumb: 'Listings', bed: 'Bed', beds: 'Beds', bath: 'Bath', baths: 'Baths', sqftLabel: 'sqft', descriptionLabel: 'Description', amenitiesLabel: 'Features & Amenities', detailsLabel: 'Property Details', detailType: 'Type', detailListing: 'Listing', detailCity: 'City', detailCountry: 'Country', detailSize: 'Size', detailBedrooms: 'Bedrooms', detailBathrooms: 'Bathrooms', keyVerifiedListing: 'Verified Listing', keyAvailability: 'Availability', keyVirtualTour: 'Virtual Tour', keyEpcRating: 'EPC Rating', statusImmediate: 'Immediate', statusNow: 'Now', statusAvailable: 'Available', statusYes: 'Yes', statusPending: 'Pending', locationLabel: 'Location', mapOnRequest: 'Full map available on request', askingPrice: 'Asking Price', rentalPrice: 'Rental Price', listedBy: 'Listed by', respondsWithin: 'Typically responds within 24 hrs', sendEnquiry: 'Send Enquiry', requestViewing: 'Request Viewing', bookVisit: 'Book In-Person Visit', contactTerms: 'By contacting, you agree to our Terms and Privacy Policy.', backToListings: 'Back to all listings', moreFromThis: 'More Like This', similarListingsLabel: 'Similar Listings', viewAll: 'View all', mediaLabel: 'Media', virtualToursVideos: 'Virtual Tours & Videos', hdVideo: 'HD Video', virtualTourTitle: 'Virtual Tour', virtualTourFull: 'Full virtual tour available on request', requestAccess: 'Request Access', mortgageEstimate: 'Estimate', mortgageTitle: 'Mortgage Calculator', monthlyRepayment: 'Monthly Repayment', depositLabel: 'Deposit', interestRateLabel: 'Interest Rate', mortgageTermLabel: 'Mortgage Term', yearsLabel: 'years', loanAmountLabel: 'Loan Amount', totalInterestLabel: 'Total Interest', totalRepayableLabel: 'Total Repayable', mortgageDisclaimer: 'For illustrative purposes only. Consult a qualified mortgage advisor for a personalised quote.', priceNotAvailable: 'Price not available for calculation.', energyPerformanceLabel: 'Energy Performance', epcRatingLabel: 'EPC Rating', epcCurrent: 'Current', epcPotential: 'Potential', epcDisclaimer: 'Energy performance ratings are indicative. A full EPC report is available upon request.', memberRole: 'Member'`,
  fr: `    breadcrumb: 'Annonces', bed: 'Chambre', beds: 'Chambres', bath: 'Salle de bain', baths: 'Salles de bain', sqftLabel: 'm²', descriptionLabel: 'Description', amenitiesLabel: 'Caractéristiques et commodités', detailsLabel: 'Détails du bien', detailType: 'Type', detailListing: 'Annonce', detailCity: 'Ville', detailCountry: 'Pays', detailSize: 'Surface', detailBedrooms: 'Chambres', detailBathrooms: 'Salles de bain', keyVerifiedListing: 'Annonce vérifiée', keyAvailability: 'Disponibilité', keyVirtualTour: 'Visite virtuelle', keyEpcRating: 'DPE', statusImmediate: 'Immédiate', statusNow: 'Maintenant', statusAvailable: 'Disponible', statusYes: 'Oui', statusPending: 'En attente', locationLabel: 'Emplacement', mapOnRequest: 'Carte complète disponible sur demande', askingPrice: 'Prix demandé', rentalPrice: 'Loyer mensuel', listedBy: 'Publié par', respondsWithin: 'Répond généralement sous 24h', sendEnquiry: 'Envoyer une demande', requestViewing: 'Demander une visite', bookVisit: 'Réserver une visite en personne', contactTerms: 'En prenant contact, vous acceptez nos Conditions et notre Politique de confidentialité.', backToListings: 'Retour aux annonces', moreFromThis: 'Du même type', similarListingsLabel: 'Annonces similaires', viewAll: 'Voir tout', mediaLabel: 'Médias', virtualToursVideos: 'Visites virtuelles et vidéos', hdVideo: 'Vidéo HD', virtualTourTitle: 'Visite virtuelle', virtualTourFull: 'Visite virtuelle complète disponible sur demande', requestAccess: 'Demander accès', mortgageEstimate: 'Estimation', mortgageTitle: 'Calculateur de prêt', monthlyRepayment: 'Mensualité', depositLabel: 'Apport', interestRateLabel: 'Taux hypothécaire', mortgageTermLabel: 'Durée du prêt', yearsLabel: 'ans', loanAmountLabel: 'Montant emprunté', totalInterestLabel: 'Intérêts totaux', totalRepayableLabel: 'Total remboursable', mortgageDisclaimer: 'À titre indicatif uniquement. Consultez un conseiller hypothécaire pour un devis personnalisé.', priceNotAvailable: 'Prix non disponible pour le calcul.', energyPerformanceLabel: 'Performance énergétique', epcRatingLabel: 'DPE', epcCurrent: 'Actuel', epcPotential: 'Potentiel', epcDisclaimer: 'Les notes énergétiques sont indicatives. Un rapport DPE complet est disponible sur demande.', memberRole: 'Membre'`,
  es: `    breadcrumb: 'Propiedades', bed: 'Habitación', beds: 'Habitaciones', bath: 'Baño', baths: 'Baños', sqftLabel: 'm²', descriptionLabel: 'Descripción', amenitiesLabel: 'Características y comodidades', detailsLabel: 'Detalles del inmueble', detailType: 'Tipo', detailListing: 'Anuncio', detailCity: 'Ciudad', detailCountry: 'País', detailSize: 'Superficie', detailBedrooms: 'Dormitorios', detailBathrooms: 'Baños', keyVerifiedListing: 'Anuncio verificado', keyAvailability: 'Disponibilidad', keyVirtualTour: 'Tour virtual', keyEpcRating: 'Calificación energética', statusImmediate: 'Inmediata', statusNow: 'Ahora', statusAvailable: 'Disponible', statusYes: 'Sí', statusPending: 'Pendiente', locationLabel: 'Ubicación', mapOnRequest: 'Mapa completo disponible bajo solicitud', askingPrice: 'Precio de venta', rentalPrice: 'Precio de alquiler', listedBy: 'Publicado por', respondsWithin: 'Responde normalmente en 24 horas', sendEnquiry: 'Enviar consulta', requestViewing: 'Solicitar visita', bookVisit: 'Reservar visita presencial', contactTerms: 'Al contactar, acepta nuestros Términos y Política de privacidad.', backToListings: 'Volver a todas las propiedades', moreFromThis: 'Más como este', similarListingsLabel: 'Propiedades similares', viewAll: 'Ver todo', mediaLabel: 'Multimedia', virtualToursVideos: 'Tours virtuales y vídeos', hdVideo: 'Vídeo HD', virtualTourTitle: 'Tour virtual', virtualTourFull: 'Tour virtual completo disponible bajo solicitud', requestAccess: 'Solicitar acceso', mortgageEstimate: 'Estimación', mortgageTitle: 'Calculadora hipotecaria', monthlyRepayment: 'Cuota mensual', depositLabel: 'Depósito', interestRateLabel: 'Tipo de interés', mortgageTermLabel: 'Plazo hipotecario', yearsLabel: 'años', loanAmountLabel: 'Importe del préstamo', totalInterestLabel: 'Interés total', totalRepayableLabel: 'Total a pagar', mortgageDisclaimer: 'Solo con fines ilustrativos. Consulte a un asesor hipotecario para un presupuesto personalizado.', priceNotAvailable: 'Precio no disponible para cálculo.', energyPerformanceLabel: 'Eficiencia energética', epcRatingLabel: 'Calificación energética', epcCurrent: 'Actual', epcPotential: 'Potencial', epcDisclaimer: 'Las calificaciones energéticas son indicativas. Un informe EPC completo está disponible bajo solicitud.', memberRole: 'Miembro'`,
  ar: `    breadcrumb: 'القوائم', bed: 'غرفة', beds: 'غرف', bath: 'حمام', baths: 'حمامات', sqftLabel: 'قدم²', descriptionLabel: 'الوصف', amenitiesLabel: 'المميزات والمرافق', detailsLabel: 'تفاصيل العقار', detailType: 'النوع', detailListing: 'القائمة', detailCity: 'المدينة', detailCountry: 'الدولة', detailSize: 'المساحة', detailBedrooms: 'غرف النوم', detailBathrooms: 'الحمامات', keyVerifiedListing: 'قائمة موثقة', keyAvailability: 'التوفر', keyVirtualTour: 'جولة افتراضية', keyEpcRating: 'تقييم الطاقة', statusImmediate: 'فوري', statusNow: 'الآن', statusAvailable: 'متاح', statusYes: 'نعم', statusPending: 'قيد الانتظار', locationLabel: 'الموقع', mapOnRequest: 'الخريطة الكاملة متاحة عند الطلب', askingPrice: 'سعر الطلب', rentalPrice: 'سعر الإيجار', listedBy: 'نشر بواسطة', respondsWithin: 'يستجيب عادةً خلال 24 ساعة', sendEnquiry: 'إرسال استفسار', requestViewing: 'طلب معاينة', bookVisit: 'حجز زيارة شخصية', contactTerms: 'بالتواصل، توافق على شروطنا وسياسة الخصوصية.', backToListings: 'العودة إلى جميع القوائم', moreFromThis: 'المزيد من هذا النوع', similarListingsLabel: 'قوائم مشابهة', viewAll: 'عرض الكل', mediaLabel: 'الوسائط', virtualToursVideos: 'الجولات الافتراضية والفيديوهات', hdVideo: 'فيديو عالي الدقة', virtualTourTitle: 'جولة افتراضية', virtualTourFull: 'الجولة الافتراضية الكاملة متاحة عند الطلب', requestAccess: 'طلب الوصول', mortgageEstimate: 'تقدير', mortgageTitle: 'حاسبة الرهن العقاري', monthlyRepayment: 'القسط الشهري', depositLabel: 'الدفعة المقدمة', interestRateLabel: 'معدل الفائدة', mortgageTermLabel: 'مدة القرض', yearsLabel: 'سنوات', loanAmountLabel: 'مبلغ القرض', totalInterestLabel: 'إجمالي الفائدة', totalRepayableLabel: 'إجمالي المستحق', mortgageDisclaimer: 'للأغراض التوضيحية فقط. استشر مستشار رهن عقاري للحصول على عرض مخصص.', priceNotAvailable: 'السعر غير متاح للحساب.', energyPerformanceLabel: 'الأداء الطاقوي', epcRatingLabel: 'تقييم الطاقة', epcCurrent: 'الحالي', epcPotential: 'المحتمل', epcDisclaimer: 'تقييمات الأداء الطاقوي استرشادية. تقرير EPC كامل متاح عند الطلب.', memberRole: 'عضو'`,
  de: `    breadcrumb: 'Angebote', bed: 'Schlafzimmer', beds: 'Schlafzimmer', bath: 'Bad', baths: 'Bäder', sqftLabel: 'm²', descriptionLabel: 'Beschreibung', amenitiesLabel: 'Ausstattung und Merkmale', detailsLabel: 'Objektdetails', detailType: 'Typ', detailListing: 'Angebot', detailCity: 'Stadt', detailCountry: 'Land', detailSize: 'Größe', detailBedrooms: 'Schlafzimmer', detailBathrooms: 'Badezimmer', keyVerifiedListing: 'Geprüftes Angebot', keyAvailability: 'Verfügbarkeit', keyVirtualTour: 'Virtuelle Tour', keyEpcRating: 'Energieausweis', statusImmediate: 'Sofort', statusNow: 'Jetzt', statusAvailable: 'Verfügbar', statusYes: 'Ja', statusPending: 'Ausstehend', locationLabel: 'Lage', mapOnRequest: 'Vollständige Karte auf Anfrage', askingPrice: 'Kaufpreis', rentalPrice: 'Mietpreis', listedBy: 'Angeboten von', respondsWithin: 'Antwortet in der Regel innerhalb von 24 Std.', sendEnquiry: 'Anfrage senden', requestViewing: 'Besichtigung anfragen', bookVisit: 'Vor-Ort-Besichtigung buchen', contactTerms: 'Mit der Kontaktaufnahme stimmen Sie unseren AGB und Datenschutzbestimmungen zu.', backToListings: 'Zurück zu allen Angeboten', moreFromThis: 'Mehr davon', similarListingsLabel: 'Ähnliche Angebote', viewAll: 'Alle anzeigen', mediaLabel: 'Medien', virtualToursVideos: 'Virtuelle Touren und Videos', hdVideo: 'HD-Video', virtualTourTitle: 'Virtuelle Tour', virtualTourFull: 'Vollständige virtuelle Tour auf Anfrage', requestAccess: 'Zugang anfordern', mortgageEstimate: 'Schätzung', mortgageTitle: 'Hypothekenrechner', monthlyRepayment: 'Monatliche Rate', depositLabel: 'Anzahlung', interestRateLabel: 'Zinssatz', mortgageTermLabel: 'Kreditlaufzeit', yearsLabel: 'Jahre', loanAmountLabel: 'Darlehensbetrag', totalInterestLabel: 'Gesamtzinsen', totalRepayableLabel: 'Gesamtrückzahlung', mortgageDisclaimer: 'Nur zur Veranschaulichung. Konsultieren Sie einen Hypothekenberater für ein persönliches Angebot.', priceNotAvailable: 'Preis nicht verfügbar.', energyPerformanceLabel: 'Energieeffizienz', epcRatingLabel: 'Energieausweis', epcCurrent: 'Aktuell', epcPotential: 'Potenzial', epcDisclaimer: 'Energiebewertungen sind Richtwerte. Ein vollständiger Energieausweis ist auf Anfrage erhältlich.', memberRole: 'Mitglied'`,
  pt: `breadcrumb: 'Imóveis', bed: 'Quarto', beds: 'Quartos', bath: 'Casa de banho', baths: 'Casas de banho', sqftLabel: 'm²', descriptionLabel: 'Descrição', amenitiesLabel: 'Características e comodidades', detailsLabel: 'Detalhes do imóvel', detailType: 'Tipo', detailListing: 'Anúncio', detailCity: 'Cidade', detailCountry: 'País', detailSize: 'Dimensão', detailBedrooms: 'Quartos', detailBathrooms: 'Casas de banho', keyVerifiedListing: 'Anúncio verificado', keyAvailability: 'Disponibilidade', keyVirtualTour: 'Visita virtual', keyEpcRating: 'Certificado energético', statusImmediate: 'Imediata', statusNow: 'Agora', statusAvailable: 'Disponível', statusYes: 'Sim', statusPending: 'Pendente', locationLabel: 'Localização', mapOnRequest: 'Mapa completo disponível mediante pedido', askingPrice: 'Preço pedido', rentalPrice: 'Preço de arrendamento', listedBy: 'Publicado por', respondsWithin: 'Responde normalmente em 24h', sendEnquiry: 'Enviar pedido', requestViewing: 'Solicitar visita', bookVisit: 'Reservar visita presencial', contactTerms: 'Ao contactar, aceita os nossos Termos e Política de privacidade.', backToListings: 'Voltar a todos os imóveis', moreFromThis: 'Mais como este', similarListingsLabel: 'Imóveis semelhantes', viewAll: 'Ver tudo', mediaLabel: 'Multimédia', virtualToursVideos: 'Visitas virtuais e vídeos', hdVideo: 'Vídeo HD', virtualTourTitle: 'Visita virtual', virtualTourFull: 'Visita virtual completa disponível mediante pedido', requestAccess: 'Solicitar acesso', mortgageEstimate: 'Estimativa', mortgageTitle: 'Simulador de crédito', monthlyRepayment: 'Prestação mensal', depositLabel: 'Entrada', interestRateLabel: 'Taxa de juro', mortgageTermLabel: 'Prazo do crédito', yearsLabel: 'anos', loanAmountLabel: 'Montante do crédito', totalInterestLabel: 'Juros totais', totalRepayableLabel: 'Total a reembolsar', mortgageDisclaimer: 'Apenas para fins ilustrativos. Consulte um especialista em crédito para uma proposta personalizada.', priceNotAvailable: 'Preço não disponível para cálculo.', energyPerformanceLabel: 'Desempenho energético', epcRatingLabel: 'Certificado energético', epcCurrent: 'Atual', epcPotential: 'Potencial', epcDisclaimer: 'As classificações energéticas são indicativas. Um certificado EPC completo está disponível mediante pedido.', memberRole: 'Membro'`,
  zh: `breadcrumb: '房源', bed: '卧室', beds: '卧室', bath: '浴室', baths: '浴室', sqftLabel: '平方米', descriptionLabel: '描述', amenitiesLabel: '特色与设施', detailsLabel: '房产详情', detailType: '类型', detailListing: '房源', detailCity: '城市', detailCountry: '国家', detailSize: '面积', detailBedrooms: '卧室数', detailBathrooms: '浴室数', keyVerifiedListing: '已验证房源', keyAvailability: '可用性', keyVirtualTour: '虚拟参观', keyEpcRating: '能效等级', statusImmediate: '立即', statusNow: '现在', statusAvailable: '可用', statusYes: '是', statusPending: '待定', locationLabel: '位置', mapOnRequest: '完整地图可按需提供', askingPrice: '要价', rentalPrice: '租赁价格', listedBy: '发布者', respondsWithin: '通常24小时内回复', sendEnquiry: '发送咨询', requestViewing: '申请参观', bookVisit: '预约实地参观', contactTerms: '联系即表示您同意我们的条款和隐私政策。', backToListings: '返回所有房源', moreFromThis: '更多同类', similarListingsLabel: '相似房源', viewAll: '查看全部', mediaLabel: '媒体', virtualToursVideos: '虚拟参观和视频', hdVideo: '高清视频', virtualTourTitle: '虚拟参观', virtualTourFull: '完整虚拟参观可按需提供', requestAccess: '申请访问', mortgageEstimate: '估算', mortgageTitle: '贷款计算器', monthlyRepayment: '月还款额', depositLabel: '首付', interestRateLabel: '利率', mortgageTermLabel: '贷款期限', yearsLabel: '年', loanAmountLabel: '贷款金额', totalInterestLabel: '总利息', totalRepayableLabel: '总还款额', mortgageDisclaimer: '仅供参考。请咨询合格的贷款顾问以获取个性化报价。', priceNotAvailable: '价格不可用于计算。', energyPerformanceLabel: '能源绩效', epcRatingLabel: '能效等级', epcCurrent: '当前', epcPotential: '潜在', epcDisclaimer: '能效评级仅供参考。完整EPC报告可按需提供。', memberRole: '会员'`,
  it: `    breadcrumb: 'Annunci', bed: 'Camera', beds: 'Camere', bath: 'Bagno', baths: 'Bagni', sqftLabel: 'm²', descriptionLabel: 'Descrizione', amenitiesLabel: 'Caratteristiche e dotazioni', detailsLabel: 'Dettagli immobile', detailType: 'Tipo', detailListing: 'Annuncio', detailCity: 'Città', detailCountry: 'Paese', detailSize: 'Dimensione', detailBedrooms: 'Camere', detailBathrooms: 'Bagni', keyVerifiedListing: 'Annuncio verificato', keyAvailability: 'Disponibilità', keyVirtualTour: 'Tour virtuale', keyEpcRating: 'Classe energetica', statusImmediate: 'Immediata', statusNow: 'Ora', statusAvailable: 'Disponibile', statusYes: 'Sì', statusPending: 'In attesa', locationLabel: 'Posizione', mapOnRequest: 'Mappa completa disponibile su richiesta', askingPrice: 'Prezzo richiesto', rentalPrice: 'Canone di affitto', listedBy: 'Pubblicato da', respondsWithin: 'Risponde in genere entro 24 ore', sendEnquiry: 'Invia richiesta', requestViewing: 'Richiedi visita', bookVisit: 'Prenota visita di persona', contactTerms: 'Contattando, accetti i nostri Termini e la nostra Informativa sulla privacy.', backToListings: 'Torna a tutti gli annunci', moreFromThis: 'Altro di questo tipo', similarListingsLabel: 'Annunci simili', viewAll: 'Vedi tutto', mediaLabel: 'Media', virtualToursVideos: 'Tour virtuali e video', hdVideo: 'Video HD', virtualTourTitle: 'Tour virtuale', virtualTourFull: 'Tour virtuale completo disponibile su richiesta', requestAccess: 'Richiedi accesso', mortgageEstimate: 'Stima', mortgageTitle: 'Calcolatore mutuo', monthlyRepayment: 'Rata mensile', depositLabel: 'Acconto', interestRateLabel: 'Tasso di interesse', mortgageTermLabel: 'Durata del mutuo', yearsLabel: 'anni', loanAmountLabel: 'Importo del prestito', totalInterestLabel: 'Interessi totali', totalRepayableLabel: 'Totale da rimborsare', mortgageDisclaimer: 'Solo a scopo illustrativo. Consulta un consulente ipotecario per un preventivo personalizzato.', priceNotAvailable: 'Prezzo non disponibile per il calcolo.', energyPerformanceLabel: 'Prestazione energetica', epcRatingLabel: 'Classe energetica', epcCurrent: 'Attuale', epcPotential: 'Potenziale', epcDisclaimer: 'Le valutazioni energetiche sono indicative. Un rapporto EPC completo è disponibile su richiesta.', memberRole: 'Membro'`,
  ru: `breadcrumb: 'Объявления', bed: 'Спальня', beds: 'Спальни', bath: 'Ванная', baths: 'Ванные', sqftLabel: 'кв.м', descriptionLabel: 'Описание', amenitiesLabel: 'Характеристики', detailsLabel: 'Детали объекта', detailType: 'Тип', detailListing: 'Объявление', detailCity: 'Город', detailCountry: 'Страна', detailSize: 'Площадь', detailBedrooms: 'Спальни', detailBathrooms: 'Ванные', keyVerifiedListing: 'Проверенное объявление', keyAvailability: 'Доступность', keyVirtualTour: 'Виртуальный тур', keyEpcRating: 'Энергоэффективность', statusImmediate: 'Немедленно', statusNow: 'Сейчас', statusAvailable: 'Доступно', statusYes: 'Да', statusPending: 'Ожидание', locationLabel: 'Местоположение', mapOnRequest: 'Полная карта по запросу', askingPrice: 'Цена продажи', rentalPrice: 'Цена аренды', listedBy: 'Опубликовано', respondsWithin: 'Обычно отвечает в течение 24 ч', sendEnquiry: 'Отправить запрос', requestViewing: 'Запросить просмотр', bookVisit: 'Записаться на личный осмотр', contactTerms: 'Обращаясь, вы принимаете наши Условия и Политику конфиденциальности.', backToListings: 'Назад ко всем объявлениям', moreFromThis: 'Похожие', similarListingsLabel: 'Похожие объявления', viewAll: 'Смотреть все', mediaLabel: 'Медиа', virtualToursVideos: 'Виртуальные туры и видео', hdVideo: 'HD Видео', virtualTourTitle: 'Виртуальный тур', virtualTourFull: 'Полный виртуальный тур по запросу', requestAccess: 'Запросить доступ', mortgageEstimate: 'Оценка', mortgageTitle: 'Ипотечный калькулятор', monthlyRepayment: 'Ежемесячный платёж', depositLabel: 'Первоначальный взнос', interestRateLabel: 'Процентная ставка', mortgageTermLabel: 'Срок кредита', yearsLabel: 'лет', loanAmountLabel: 'Сумма кредита', totalInterestLabel: 'Общие проценты', totalRepayableLabel: 'Общая сумма', mortgageDisclaimer: 'Только для иллюстрации. Проконсультируйтесь с ипотечным консультантом.', priceNotAvailable: 'Цена недоступна для расчёта.', energyPerformanceLabel: 'Энергоэффективность', epcRatingLabel: 'Энергетический рейтинг', epcCurrent: 'Текущий', epcPotential: 'Потенциал', epcDisclaimer: 'Оценки энергоэффективности носят ориентировочный характер.', memberRole: 'Участник'`,
  tr: `breadcrumb: 'İlanlar', bed: 'Yatak odası', beds: 'Yatak odaları', bath: 'Banyo', baths: 'Banyolar', sqftLabel: 'm²', descriptionLabel: 'Açıklama', amenitiesLabel: 'Özellikler ve olanaklarlar', detailsLabel: 'Mülk detayları', detailType: 'Tür', detailListing: 'İlan', detailCity: 'Şehir', detailCountry: 'Ülke', detailSize: 'Boyut', detailBedrooms: 'Yatak odaları', detailBathrooms: 'Banyolar', keyVerifiedListing: 'Onaylı ilan', keyAvailability: 'Müsaitlik', keyVirtualTour: 'Sanal tur', keyEpcRating: 'Enerji sınıfı', statusImmediate: 'Hemen', statusNow: 'Şimdi', statusAvailable: 'Müsait', statusYes: 'Evet', statusPending: 'Beklemede', locationLabel: 'Konum', mapOnRequest: 'Tam harita talep üzerine', askingPrice: 'İstenen fiyat', rentalPrice: 'Kira fiyatı', listedBy: 'Yayınlayan', respondsWithin: 'Genellikle 24 saat içinde yanıt verir', sendEnquiry: 'Sorgu gönder', requestViewing: 'Görüntüleme talep et', bookVisit: 'Yerinde ziyaret rezervasyonu', contactTerms: 'İletişime geçerek Koşullarımızı ve Gizlilik Politikamızı kabul etmiş olursunuz.', backToListings: 'Tüm ilanlara dön', moreFromThis: 'Daha fazlası', similarListingsLabel: 'Benzer ilanlar', viewAll: 'Tümünü gör', mediaLabel: 'Medya', virtualToursVideos: 'Sanal turlar ve videolar', hdVideo: 'HD Video', virtualTourTitle: 'Sanal tur', virtualTourFull: 'Tam sanal tur talep üzerine', requestAccess: 'Erişim talep et', mortgageEstimate: 'Tahmin', mortgageTitle: 'Mortgage hesaplayıcı', monthlyRepayment: 'Aylık ödeme', depositLabel: 'Peşinat', interestRateLabel: 'Faiz oranı', mortgageTermLabel: 'Kredi süresi', yearsLabel: 'yıl', loanAmountLabel: 'Kredi tutarı', totalInterestLabel: 'Toplam faiz', totalRepayableLabel: 'Toplam geri ödeme', mortgageDisclaimer: 'Yalnızca gösterim amaçlıdır. Kişiselleştirilmiş teklif için mortgage danışmanına başvurun.', priceNotAvailable: 'Fiyat hesaplama için mevcut değil.', energyPerformanceLabel: 'Enerji performansı', epcRatingLabel: 'Enerji sınıfı', epcCurrent: 'Mevcut', epcPotential: 'Potansiyel', epcDisclaimer: 'Enerji derecelendirmeleri gösterge niteliğindedir.', memberRole: 'Üye'`,
  hi: `breadcrumb: 'लिस्टिंग', bed: 'बेडरूम', beds: 'बेडरूम', bath: 'बाथरूम', baths: 'बाथरूम', sqftLabel: 'वर्ग फुट', descriptionLabel: 'विवरण', amenitiesLabel: 'विशेषताएं और सुविधाएं', detailsLabel: 'संपत्ति विवरण', detailType: 'प्रकार', detailListing: 'लिस्टिंग', detailCity: 'शहर', detailCountry: 'देश', detailSize: 'आकार', detailBedrooms: 'बेडरूम', detailBathrooms: 'बाथरूम', keyVerifiedListing: 'सत्यापित लिस्टिंग', keyAvailability: 'उपलब्धता', keyVirtualTour: 'वर्चुअल टूर', keyEpcRating: 'ऊर्जा रेटिंग', statusImmediate: 'तत्काल', statusNow: 'अभी', statusAvailable: 'उपलब्ध', statusYes: 'हां', statusPending: 'लंबित', locationLabel: 'स्थान', mapOnRequest: 'अनुरोध पर पूरा नक्शा उपलब्ध', askingPrice: 'मांग मूल्य', rentalPrice: 'किराया मूल्य', listedBy: 'द्वारा सूचीबद्ध', respondsWithin: 'आमतौर पर 24 घंटे में जवाब देते हैं', sendEnquiry: 'पूछताछ भेजें', requestViewing: 'देखने का अनुरोध', bookVisit: 'व्यक्तिगत यात्रा बुक करें', contactTerms: 'संपर्क करके आप हमारी शर्तों और गोपनीयता नीति से सहमत होते हैं।', backToListings: 'सभी लिस्टिंग पर वापस', moreFromThis: 'इस जैसे और', similarListingsLabel: 'समान लिस्टिंग', viewAll: 'सब देखें', mediaLabel: 'मीडिया', virtualToursVideos: 'वर्चुअल टूर और वीडियो', hdVideo: 'HD वीडियो', virtualTourTitle: 'वर्चुअल टूर', virtualTourFull: 'अनुरोध पर पूरा वर्चुअल टूर', requestAccess: 'एक्सेस का अनुरोध', mortgageEstimate: 'अनुमान', mortgageTitle: 'बंधक कैलकुलेटर', monthlyRepayment: 'मासिक भुगतान', depositLabel: 'डाउनपेमेंट', interestRateLabel: 'ब्याज दर', mortgageTermLabel: 'ऋण अवधि', yearsLabel: 'वर्ष', loanAmountLabel: 'ऋण राशि', totalInterestLabel: 'कुल ब्याज', totalRepayableLabel: 'कुल देय', mortgageDisclaimer: 'केवल उदाहरण के लिए। व्यक्तिगत उद्धरण के लिए बंधक सलाहकार से परामर्श करें।', priceNotAvailable: 'मूल्य गणना के लिए उपलब्ध नहीं।', energyPerformanceLabel: 'ऊर्जा प्रदर्शन', epcRatingLabel: 'ऊर्जा रेटिंग', epcCurrent: 'वर्तमान', epcPotential: 'संभावित', epcDisclaimer: 'ऊर्जा रेटिंग संकेतक हैं।', memberRole: 'सदस्य'`,
  ja: `breadcrumb: '物件一覧', bed: '寝室', beds: '寝室', bath: 'バス', baths: 'バス', sqftLabel: '㎡', descriptionLabel: '説明', amenitiesLabel: '特徴と設備', detailsLabel: '物件詳細', detailType: 'タイプ', detailListing: '掲載', detailCity: '都市', detailCountry: '国', detailSize: '広さ', detailBedrooms: '寝室数', detailBathrooms: 'バス数', keyVerifiedListing: '認定済み物件', keyAvailability: '空き状況', keyVirtualTour: 'バーチャルツアー', keyEpcRating: 'エネルギー評価', statusImmediate: '即時', statusNow: '今すぐ', statusAvailable: '空き有り', statusYes: 'はい', statusPending: '保留中', locationLabel: '場所', mapOnRequest: '詳細地図は要請に応じて提供', askingPrice: '売出し価格', rentalPrice: '賃貸価格', listedBy: '掲載者', respondsWithin: '通常24時間以内に返答', sendEnquiry: '問い合わせを送る', requestViewing: '内見を申し込む', bookVisit: '現地訪問を予約', contactTerms: 'お問い合わせにより、利用規約およびプライバシーポリシーに同意したものとみなします。', backToListings: '物件一覧に戻る', moreFromThis: '同タイプの物件', similarListingsLabel: '似た物件', viewAll: 'すべて表示', mediaLabel: 'メディア', virtualToursVideos: 'バーチャルツアーと動画', hdVideo: 'HD動画', virtualTourTitle: 'バーチャルツアー', virtualTourFull: '全バーチャルツアーは要請に応じて提供', requestAccess: 'アクセス申請', mortgageEstimate: '試算', mortgageTitle: '住宅ローン計算機', monthlyRepayment: '月々の返済額', depositLabel: '頭金', interestRateLabel: '金利', mortgageTermLabel: 'ローン期間', yearsLabel: '年', loanAmountLabel: 'ローン金額', totalInterestLabel: '合計利息', totalRepayableLabel: '総返済額', mortgageDisclaimer: 'あくまで参考値です。個別の見積もりについては住宅ローンアドバイザーにご相談ください。', priceNotAvailable: '価格が計算に利用できません。', energyPerformanceLabel: 'エネルギー性能', epcRatingLabel: 'エネルギー評価', epcCurrent: '現在', epcPotential: '潜在', epcDisclaimer: 'エネルギー評価は参考値です。', memberRole: 'メンバー'`,
  ko: `breadcrumb: '매물 목록', bed: '침실', beds: '침실', bath: '욕실', baths: '욕실', sqftLabel: '㎡', descriptionLabel: '설명', amenitiesLabel: '특징 및 편의시설', detailsLabel: '부동산 상세정보', detailType: '유형', detailListing: '매물', detailCity: '도시', detailCountry: '국가', detailSize: '면적', detailBedrooms: '침실 수', detailBathrooms: '욕실 수', keyVerifiedListing: '인증된 매물', keyAvailability: '이용 가능 여부', keyVirtualTour: '가상 투어', keyEpcRating: '에너지 등급', statusImmediate: '즉시', statusNow: '지금', statusAvailable: '이용 가능', statusYes: '예', statusPending: '대기 중', locationLabel: '위치', mapOnRequest: '요청 시 전체 지도 제공', askingPrice: '희망 매도가', rentalPrice: '임대 가격', listedBy: '등록자', respondsWithin: '일반적으로 24시간 이내 답변', sendEnquiry: '문의 보내기', requestViewing: '방문 신청', bookVisit: '직접 방문 예약', contactTerms: '연락하시면 이용약관 및 개인정보 처리방침에 동의하는 것으로 간주됩니다.', backToListings: '전체 매물로 돌아가기', moreFromThis: '이와 유사한 매물', similarListingsLabel: '유사 매물', viewAll: '전체 보기', mediaLabel: '미디어', virtualToursVideos: '가상 투어 및 동영상', hdVideo: 'HD 동영상', virtualTourTitle: '가상 투어', virtualTourFull: '요청 시 전체 가상 투어 제공', requestAccess: '접근 요청', mortgageEstimate: '추정', mortgageTitle: '주택담보대출 계산기', monthlyRepayment: '월 상환액', depositLabel: '계약금', interestRateLabel: '이자율', mortgageTermLabel: '대출 기간', yearsLabel: '년', loanAmountLabel: '대출 금액', totalInterestLabel: '총 이자', totalRepayableLabel: '총 상환액', mortgageDisclaimer: '참고용으로만 제공됩니다. 맞춤 견적은 주택담보대출 전문가에게 문의하세요.', priceNotAvailable: '계산에 사용할 수 있는 가격이 없습니다.', energyPerformanceLabel: '에너지 성능', epcRatingLabel: '에너지 등급', epcCurrent: '현재', epcPotential: '잠재', epcDisclaimer: '에너지 등급은 참고용입니다.', memberRole: '회원'`,
  nl: `breadcrumb: 'Aanbod', bed: 'Slaapkamer', beds: 'Slaapkamers', bath: 'Badkamer', baths: 'Badkamers', sqftLabel: 'm²', descriptionLabel: 'Omschrijving', amenitiesLabel: 'Kenmerken en voorzieningen', detailsLabel: 'Vastgoeddetails', detailType: 'Type', detailListing: 'Aanbieding', detailCity: 'Stad', detailCountry: 'Land', detailSize: 'Grootte', detailBedrooms: 'Slaapkamers', detailBathrooms: 'Badkamers', keyVerifiedListing: 'Geverifieerde aanbieding', keyAvailability: 'Beschikbaarheid', keyVirtualTour: 'Virtuele rondleiding', keyEpcRating: 'Energielabel', statusImmediate: 'Direct', statusNow: 'Nu', statusAvailable: 'Beschikbaar', statusYes: 'Ja', statusPending: 'In behandeling', locationLabel: 'Locatie', mapOnRequest: 'Volledige kaart beschikbaar op aanvraag', askingPrice: 'Vraagprijs', rentalPrice: 'Huurprijs', listedBy: 'Aangeboden door', respondsWithin: 'Reageert doorgaans binnen 24 uur', sendEnquiry: 'Vraag sturen', requestViewing: 'Bezichtiging aanvragen', bookVisit: 'Persoonlijk bezoek boeken', contactTerms: 'Door contact op te nemen, gaat u akkoord met onze Voorwaarden en Privacybeleid.', backToListings: 'Terug naar alle aanbiedingen', moreFromThis: 'Meer zoals dit', similarListingsLabel: 'Vergelijkbaar aanbod', viewAll: 'Alles bekijken', mediaLabel: 'Media', virtualToursVideos: 'Virtuele rondleidingen en videos', hdVideo: 'HD Video', virtualTourTitle: 'Virtuele rondleiding', virtualTourFull: 'Volledige virtuele rondleiding beschikbaar op aanvraag', requestAccess: 'Toegang aanvragen', mortgageEstimate: 'Schatting', mortgageTitle: 'Hypotheekcalculator', monthlyRepayment: 'Maandelijkse aflossing', depositLabel: 'Aanbetaling', interestRateLabel: 'Rentevoet', mortgageTermLabel: 'Hypotheekduur', yearsLabel: 'jaar', loanAmountLabel: 'Leenbedrag', totalInterestLabel: 'Totale rente', totalRepayableLabel: 'Totaal terug te betalen', mortgageDisclaimer: 'Uitsluitend ter illustratie. Raadpleeg een hypotheekadviseur voor een persoonlijk advies.', priceNotAvailable: 'Prijs niet beschikbaar voor berekening.', energyPerformanceLabel: 'Energieprestatie', epcRatingLabel: 'Energielabel', epcCurrent: 'Huidig', epcPotential: 'Potentieel', epcDisclaimer: 'Energieprestaties zijn indicatief. Een volledig EPC-rapport is beschikbaar op aanvraag.', memberRole: 'Lid'`,
}

// ── EN: multiline, known exact ending ─────────────────────────────────────────
{
  const keysBlock = newKeys.en
  const old = `    agricultural: 'Agricultural',\n  },\n  home: {`
  const replacement = `    agricultural: 'Agricultural',\n${keysBlock},\n  },\n  home: {`
  if (!content.includes(old)) {
    throw new Error('Could not find EN agricultural ending')
  }
  content = content.replace(old, replacement)
  console.log('✓ EN done')
}

// ── FR multiline ──────────────────────────────────────────────────────────────
{
  const old = `    agricultural: 'Agricole',\n  },\n  home: {`
  const replacement = `    agricultural: 'Agricole',\n${newKeys.fr},\n  },\n  home: {`
  if (!content.includes(old)) throw new Error('Could not find FR agricultural ending')
  content = content.replace(old, replacement)
  console.log('✓ FR done')
}

// ── ES multiline ──────────────────────────────────────────────────────────────
{
  const old = `    agricultural: 'Agrícola',\n  },\n  home: {`
  // ES has this ending; check it only appears once in the range
  const count = (content.match(new RegExp(`    agricultural: 'Agrícola',\\n  },\\n  home: \\{`, 'g')) || []).length
  if (count === 0) throw new Error('Could not find ES agricultural ending')
  // ES is before AR in the file; do first occurrence
  const idx = content.indexOf(old)
  const replacement = `    agricultural: 'Agrícola',\n${newKeys.es},\n  },\n  home: {`
  content = content.substring(0, idx) + replacement + content.substring(idx + old.length)
  console.log('✓ ES done')
}

// ── AR multiline ──────────────────────────────────────────────────────────────
{
  const old = `    agricultural: 'زراعي',\n  },\n  home: {`
  if (!content.includes(old)) throw new Error('Could not find AR agricultural ending')
  const replacement = `    agricultural: 'زراعي',\n${newKeys.ar},\n  },\n  home: {`
  content = content.replace(old, replacement)
  console.log('✓ AR done')
}

// ── DE multiline ──────────────────────────────────────────────────────────────
{
  const old = `    agricultural: 'Landwirtschaft',\n  },\n  home: {`
  if (!content.includes(old)) throw new Error('Could not find DE agricultural ending')
  const replacement = `    agricultural: 'Landwirtschaft',\n${newKeys.de},\n  },\n  home: {`
  content = content.replace(old, replacement)
  console.log('✓ DE done')
}

// ── PT compact single-line ────────────────────────────────────────────────────
{
  const old = `agricultural: 'Agrícola' }, home: {`
  if (!content.includes(old)) throw new Error('Could not find PT agricultural ending. Actual content around: ' + content.substring(content.indexOf('agricultural:'), content.indexOf('agricultural:') + 100))
  const replacement = `agricultural: 'Agrícola', ${newKeys.pt} }, home: {`
  content = content.replace(old, replacement)
  console.log('✓ PT done')
}

// ── ZH compact single-line ────────────────────────────────────────────────────
{
  const old = `agricultural: '农业' }, home: {`
  if (!content.includes(old)) throw new Error('Could not find ZH agricultural ending')
  const replacement = `agricultural: '农业', ${newKeys.zh} }, home: {`
  content = content.replace(old, replacement)
  console.log('✓ ZH done')
}

// ── IT multiline ──────────────────────────────────────────────────────────────
// Need to find IT's agricultural — check what value it has
{
  // Find IT dict and its agricultural value
  const itMatch = content.match(/const it: Dict = \{[\s\S]*?agricultural: '([^']+)',\n  \},\n  home: \{/)
  if (!itMatch) throw new Error('Could not find IT agricultural ending')
  const itAg = itMatch[1]
  const old = `    agricultural: '${itAg}',\n  },\n  home: {`
  // Find IT section specifically — it comes after ZH compact dict
  const itIdx = content.indexOf('const it: Dict =')
  if (itIdx === -1) throw new Error('Could not find IT dict')
  const afterIt = content.indexOf(old, itIdx)
  if (afterIt === -1) throw new Error('Could not find IT agricultural ending in IT dict')
  const replacement = `    agricultural: '${itAg}',\n${newKeys.it},\n  },\n  home: {`
  content = content.substring(0, afterIt) + replacement + content.substring(afterIt + old.length)
  console.log('✓ IT done')
}

// ── RU compact single-line ────────────────────────────────────────────────────
{
  const ruMatch = content.match(/agricultural: '([^']+)' \}, home: \{[\s\S]*?const tr: Dict/)
  if (!ruMatch) throw new Error('Could not find RU agricultural ending')
  const ruAg = ruMatch[1]
  const old = `agricultural: '${ruAg}' }, home: {`
  // Find the RU dict
  const ruIdx = content.indexOf('const ru: Dict =')
  if (ruIdx === -1) throw new Error('Could not find RU dict')
  const afterRu = content.indexOf(old, ruIdx)
  if (afterRu === -1) throw new Error('Could not find RU agricultural ending in RU dict')
  const replacement = `agricultural: '${ruAg}', ${newKeys.ru} }, home: {`
  content = content.substring(0, afterRu) + replacement + content.substring(afterRu + old.length)
  console.log('✓ RU done')
}

// ── TR compact single-line ────────────────────────────────────────────────────
{
  const trIdx = content.indexOf('const tr: Dict =')
  if (trIdx === -1) throw new Error('Could not find TR dict')
  const trSection = content.substring(trIdx, trIdx + 3000)
  const trMatch = trSection.match(/agricultural: '([^']+)' \}, home: \{/)
  if (!trMatch) throw new Error('Could not find TR agricultural ending')
  const trAg = trMatch[1]
  const old = `agricultural: '${trAg}' }, home: {`
  const afterTr = content.indexOf(old, trIdx)
  if (afterTr === -1) throw new Error('Could not find TR agricultural ending in TR dict')
  const replacement = `agricultural: '${trAg}', ${newKeys.tr} }, home: {`
  content = content.substring(0, afterTr) + replacement + content.substring(afterTr + old.length)
  console.log('✓ TR done')
}

// ── HI compact single-line ────────────────────────────────────────────────────
{
  const hiIdx = content.indexOf('const hi: Dict =')
  if (hiIdx === -1) throw new Error('Could not find HI dict')
  const hiSection = content.substring(hiIdx, hiIdx + 3000)
  const hiMatch = hiSection.match(/agricultural: '([^']+)' \}, home: \{/)
  if (!hiMatch) throw new Error('Could not find HI agricultural ending')
  const hiAg = hiMatch[1]
  const old = `agricultural: '${hiAg}' }, home: {`
  const afterHi = content.indexOf(old, hiIdx)
  if (afterHi === -1) throw new Error('Could not find HI agricultural ending in HI dict')
  const replacement = `agricultural: '${hiAg}', ${newKeys.hi} }, home: {`
  content = content.substring(0, afterHi) + replacement + content.substring(afterHi + old.length)
  console.log('✓ HI done')
}

// ── JA compact single-line ────────────────────────────────────────────────────
{
  const jaIdx = content.indexOf('const ja: Dict =')
  if (jaIdx === -1) throw new Error('Could not find JA dict')
  const jaSection = content.substring(jaIdx, jaIdx + 3000)
  const jaMatch = jaSection.match(/agricultural: '([^']+)' \}, home: \{/)
  if (!jaMatch) throw new Error('Could not find JA agricultural ending')
  const jaAg = jaMatch[1]
  const old = `agricultural: '${jaAg}' }, home: {`
  const afterJa = content.indexOf(old, jaIdx)
  if (afterJa === -1) throw new Error('Could not find JA agricultural ending in JA dict')
  const replacement = `agricultural: '${jaAg}', ${newKeys.ja} }, home: {`
  content = content.substring(0, afterJa) + replacement + content.substring(afterJa + old.length)
  console.log('✓ JA done')
}

// ── KO compact single-line ────────────────────────────────────────────────────
{
  const koIdx = content.indexOf('const ko: Dict =')
  if (koIdx === -1) throw new Error('Could not find KO dict')
  const koSection = content.substring(koIdx, koIdx + 3000)
  const koMatch = koSection.match(/agricultural: '([^']+)' \}, home: \{/)
  if (!koMatch) throw new Error('Could not find KO agricultural ending')
  const koAg = koMatch[1]
  const old = `agricultural: '${koAg}' }, home: {`
  const afterKo = content.indexOf(old, koIdx)
  if (afterKo === -1) throw new Error('Could not find KO agricultural ending in KO dict')
  const replacement = `agricultural: '${koAg}', ${newKeys.ko} }, home: {`
  content = content.substring(0, afterKo) + replacement + content.substring(afterKo + old.length)
  console.log('✓ KO done')
}

// ── NL compact single-line ────────────────────────────────────────────────────
{
  const nlIdx = content.indexOf('const nl: Dict =')
  if (nlIdx === -1) throw new Error('Could not find NL dict')
  const nlSection = content.substring(nlIdx, nlIdx + 3000)
  const nlMatch = nlSection.match(/agricultural: '([^']+)' \}, home: \{/)
  if (!nlMatch) throw new Error('Could not find NL agricultural ending')
  const nlAg = nlMatch[1]
  const old = `agricultural: '${nlAg}' }, home: {`
  const afterNl = content.indexOf(old, nlIdx)
  if (afterNl === -1) throw new Error('Could not find NL agricultural ending in NL dict')
  const replacement = `agricultural: '${nlAg}', ${newKeys.nl} }, home: {`
  content = content.substring(0, afterNl) + replacement + content.substring(afterNl + old.length)
  console.log('✓ NL done')
}

writeFileSync(filePath, content, 'utf-8')
console.log('\n✓ All 14 languages updated in lib/i18n/index.ts')
