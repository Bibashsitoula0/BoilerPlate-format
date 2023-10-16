using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.CommonRepository
{
    public interface ICommonRepository
    {
        Task<List<FiscalYears>> GetAllFiscal();
        Task<List<FiscalDetail>> GetAllFiscalDetail(int fyid);
        Task<List<Province>> GetProvince();
        Task<List<District>> GetDistrictByProvinceIds(int[] provinceIds);
        Task<List<Palika>> GetMultiplePalikaByMultipleDistrictIds(int[] districtIds);
        Task<List<ProvinceDistrictPalikaVM>> GetProvinceDistrictPalika();
        Task<bool> UpdateProvince(int id,bool is_active);
        Task<bool> UpdateDistrict(int id, bool is_active);
        Task<bool> UpdatePalika(int id, bool is_active);

        Task<bool> LockoutForFiscalYear(int id, bool is_active);
        Task<bool> LockoutForFiscalYearDetail(int id, bool is_active);

    }
}
