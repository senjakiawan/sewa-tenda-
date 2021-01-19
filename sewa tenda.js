var Pesanan = /** @class */ (function () {
    function Pesanan() {
        this.arrayPesanan = [];
    }
    Pesanan.prototype.hitungHargaFinal = function () {
        var total = 0;
        for (var i = 0; i < this.arrayPesanan.length; i++) {
            total += this.arrayPesanan[i].hargaSemua;
        }
        this.totalHargaFinal = total;
    };
    Pesanan.prototype.tampil = function () {
        this.hitungHargaFinal();
        var teks = '';
        for (var i = 0; i < this.arrayPesanan.length; i++) {
            teks += "<tr><th>" + (i + 1) + "</th>\n                    <td>" + this.arrayPesanan[i].namaIkan + "</td>\n                    <td>" + this.arrayPesanan[i].qtyHasil + "</td>\n                    <td>" + this.arrayPesanan[i].hargaSemua + "</td>";
        }
        ;
        document.getElementById('tabelHasil').innerHTML = teks;
        document.getElementById('totalSemua').value = this.totalHargaFinal.toString();
    };
    Pesanan.prototype.hitungKembalian = function () {
        this.pembayaran = parseInt(document.getElementById("bayar").value);
        this.kembalian = this.pembayaran - this.totalHargaFinal;
        document.getElementById("kembalian").value = this.kembalian.toString();
    };
    return Pesanan;
}());
var pesananAlat = new Pesanan();
var Alat = /** @class */ (function () {
    function Alat(namaAlat, stokAlat, harga, idHtml, idHtmlHarga, idTampilTotalHarga, idHtmlStok) {
        this.namaAlat = namaAlat;
        this.stokAlat = stokAlat;
        this.harga = harga;
        this.idHtml = idHtml;
        this.idHtmlHarga = idHtmlHarga;
        this.idTampilTotalHarga = idTampilTotalHarga;
        this.idHtmlStok = idHtmlStok;
        this.arrayQty = [];
        this.arrayHarga = [];
    }
    Alat.prototype.ambilNilai = function () {
        var nilai = parseInt(document.getElementById(this.idHtml).value);
        this.jumlahAlat = nilai;
        this.arrayQty.push(this.jumlahAlat);
        this.hitungQtyHasil();
        if (nilai > 0) {
            this.stokAlat = this.stokAlat - this.jumlahAlat;
            for (var i = -1; i < pesananAlat.arrayPesanan.length; i++) {
                if (pesananAlat.arrayPesanan.indexOf(this) === -1) {
                    pesananAlat.arrayPesanan.push(this);
                }
            }
        }
    };
    Alat.prototype.hitungQtyHasil = function () {
        var total = 0;
        for (var i = 0; i < this.arrayQty.length; i++) {
            total += this.arrayQty[i];
        }
        this.qtyHasil = total;
    };
    Alat.prototype.tampilOnload = function () {
        document.getElementById(this.idHtmlHarga).innerHTML = this.harga.toString();
        document.getElementById(this.idHtmlStok).value = this.stokAlat.toString();
    };
    Alat.prototype.hitungTotalHarga = function () {
        this.ambilNilai();
        var totalHarga = this.jumlahAlat * this.harga;
        this.totalHarga = totalHarga;
        this.arrayHarga.push(this.totalHarga);
        var total = 0;
        for (var i = 0; i < this.arrayHarga.length; i++) {
            total += this.arrayHarga[i];
        }
        this.hargaSemua = total;
    };
    Alat.prototype.tampil = function () {
        this.hitungTotalHarga();
        document.getElementById(this.idTampilTotalHarga).value = this.totalHarga.toString();
        document.getElementById(this.idHtmlStok).value = this.stokAlat.toString();
    };
    return Alat;
}());
var Penyewa = /** @class */ (function () {
    function Penyewa(idHtmlNama, idHtmlNoHP) {
        this.idHtmlNama = idHtmlNama;
        this.idHtmlNoHP = idHtmlNoHP;
    }
    Penyewa.prototype.tampil = function () {
        this.nama = document.getElementById(this.idHtmlNama).value;
        this.nohp = document.getElementById(this.idHtmlNoHP).value;
        document.getElementById("namaOutput").innerHTML = this.nama;
        document.getElementById("nohpOutput").innerHTML = this.nohp;
    };
    return Penyewa;
}());
var TendaSingle = new Alat('Tenda single layer', 10, 35000, 'jumlahtendasingle', 'hargasewatendasingle', 'hargasewatenda_single', 'stoktendasingle');
var TendaDouble = new Alat ('Tenda Double layer', 10, 45000, 'jumlahtendadouble', 'hargasewatendadouble', 'hargasewatenda_double', 'stoktendadouble');
var Senter = new Alat('Senter', 25, 10000, 'jumlahsenter', 'hargasewasenter', 'hargasewa_senter', 'stoksenter');
var Kompor = new Alat('Kompor', 25, 10000, 'jumlahkompor', 'hargasewakompor', 'hargasewa_kompor', 'stokkompor');
var SleepingBag = new Alat('Sleeping bag', 20, 15000, 'jumlahsleepingbag', 'hargasewasleepingbag', 'hargasewa_sleepingbag', 'stoksleepingbag');
var Gas = new Alat('Gas', 25, 5000, 'jumlahgas', 'hargasewagas', 'hargasewa_gas', 'stokgas');
var customer = new Penyewa("namaInput", "nohpInput");
function onLoad() {
    TendaSingle.tampilOnload();
    TendaDouble.tampilOnload();
    Senter.tampilOnload();
    Kompor.tampilOnload();
    SleepingBag.tampilOnload();
    Gas.tampilOnload();
}
function pesanAlat() {
    TendaSingle.tampil();
    TendaDouble.tampil();
    Senter.tampil();
    Kompor.tampil();
    SleepingBag.tampil();
    Gas.tampil();
    pesananAlat.tampil();
    customer.tampil();
}
function hitungTotal() {
    pesananAlat.hitungKembalian();
}
